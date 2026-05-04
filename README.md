# KI-Terminplanung.de

Statische, SEO/GEO-orientierte Website für `https://www.ki-terminplanung.de/`.

## Generieren

```bash
npm run generate
```

Der Generator schreibt die Startseite, Branchen-, Städte- und Themenseiten, `sitemap.xml`, `robots.txt` und `llms.txt`.

## Slack Leadflow

Das Formular sendet an `/api/configurator`. In Vercel muss eine dieser Environment Variables gesetzt sein:

- `KI_TERMINPLANUNG_SLACK_WEBHOOK_URL`
- `SLACK_WEBHOOK_URL`

Die Anfrage wird als Slack-Block-Nachricht inklusive JSON-Payload übergeben.
