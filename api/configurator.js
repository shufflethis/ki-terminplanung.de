const allowedOrigins = new Set([
  'https://www.ki-terminplanung.de',
  'https://ki-terminplanung.de',
  'http://localhost:3000',
  'http://localhost:5173',
]);

function setCors(req, res) {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function clean(value, max = 1500) {
  return String(value ?? '').trim().slice(0, max);
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (req.body && typeof req.body === 'string') return JSON.parse(req.body);
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function validate(body) {
  const required = ['firma', 'name', 'email', 'telefon'];
  const missing = required.filter((key) => !clean(body[key]));
  if (missing.length) return `Pflichtfelder fehlen: ${missing.join(', ')}`;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(body.email, 320))) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
  return null;
}

module.exports = async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method === 'GET') {
    return send(res, 200, {
      success: true,
      message: 'KI-Terminplanung Configurator API ist aktiv.',
      timestamp: new Date().toISOString(),
    });
  }
  if (req.method !== 'POST') return send(res, 405, { success: false, error: 'Method not allowed' });

  try {
    const body = await readBody(req);
    if (body.website) return send(res, 200, { success: true });

    const validationError = validate(body);
    if (validationError) return send(res, 400, { success: false, error: validationError });

    const slackWebhookUrl = process.env.KI_TERMINPLANUNG_SLACK_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhookUrl) {
      console.error('Missing Slack webhook environment variable.');
      return send(res, 500, { success: false, error: 'Slack-Integration ist nicht konfiguriert.' });
    }

    const payload = {
      submittedAt: clean(body.submittedAt) || new Date().toISOString(),
      source: clean(body.source || body.sourcePage),
      path: clean(body.path),
      pageTitle: clean(body.pageTitle),
      branche: clean(body.branche),
      firma: clean(body.firma),
      name: clean(body.name),
      email: clean(body.email, 320),
      telefon: clean(body.telefon, 80),
      stadt: clean(body.stadt, 120),
      kalender: clean(body.kalender, 160),
      anrufeProTag: Number(body.anrufeProTag || 0),
      aiRufnummern: Number(body.aiRufnummern || 1),
      minutenPaket: clean(body.minutenPaket, 40),
      supportPaket: clean(body.supportPaket, 40),
      setupPaketPro: Boolean(body.setupPaketPro),
      monatlichGesamt: Number(body.monatlichGesamt || 0),
      einmaligGesamt: Number(body.einmaligGesamt || 0),
      notiz: clean(body.notiz, 2500),
      utm: body.utm && typeof body.utm === 'object' ? body.utm : {},
    };

    const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
    const slackMessage = {
      text: `Neue KI-Terminplanung Anfrage: ${payload.firma}`,
      blocks: [
        {
          type: 'header',
          text: { type: 'plain_text', text: 'Neue KI-Terminplanung Anfrage' },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Firma:*\n${payload.firma}` },
            { type: 'mrkdwn', text: `*Kontakt:*\n${payload.name}` },
            { type: 'mrkdwn', text: `*E-Mail:*\n${payload.email}` },
            { type: 'mrkdwn', text: `*Telefon:*\n${payload.telefon}` },
            { type: 'mrkdwn', text: `*Branche:*\n${payload.branche || '-'}` },
            { type: 'mrkdwn', text: `*Stadt:*\n${payload.stadt || '-'}` },
          ],
        },
        { type: 'divider' },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Minutenpaket:*\n${payload.minutenPaket || '-'} Min` },
            { type: 'mrkdwn', text: `*AI-Rufnummern:*\n${payload.aiRufnummern}` },
            { type: 'mrkdwn', text: `*Support:*\n${payload.supportPaket || 'none'}` },
            { type: 'mrkdwn', text: `*Setup Pro:*\n${payload.setupPaketPro ? 'Ja' : 'Nein'}` },
            { type: 'mrkdwn', text: `*Monatlich:*\n${formatter.format(payload.monatlichGesamt)}` },
            { type: 'mrkdwn', text: `*Einmalig:*\n${formatter.format(payload.einmaligGesamt)}` },
          ],
        },
        {
          type: 'section',
          text: { type: 'mrkdwn', text: `*Notiz:*\n${payload.notiz || '-'}` },
        },
        {
          type: 'context',
          elements: [
            { type: 'mrkdwn', text: `Quelle: ${payload.source || '-'} | Pfad: ${payload.path || '-'}` },
          ],
        },
        {
          type: 'section',
          text: { type: 'mrkdwn', text: `*JSON:*\n\`\`\`${JSON.stringify(payload, null, 2).slice(0, 2800)}\`\`\`` },
        },
      ],
    };

    const slackResponse = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackMessage),
    });

    if (!slackResponse.ok) {
      const text = await slackResponse.text();
      console.error('Slack webhook error', slackResponse.status, text);
      return send(res, 502, { success: false, error: 'Slack konnte die Anfrage nicht annehmen.' });
    }

    return send(res, 200, { success: true });
  } catch (error) {
    console.error('Configurator API error', error);
    return send(res, 500, { success: false, error: 'Ein unerwarteter Fehler ist aufgetreten.' });
  }
};
