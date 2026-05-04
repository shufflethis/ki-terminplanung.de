(function () {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const form = document.getElementById('lead-form');
  if (!form) return;

  const monthlyEl = form.querySelector('[data-monthly]');
  const oneTimeEl = form.querySelector('[data-onetime]');
  const statusEl = form.querySelector('.form-status');
  const submitButton = form.querySelector('.form-submit');
  const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  function selectedPackagePrice() {
    const selected = form.querySelector('input[name="minutenPaket"]:checked');
    return selected ? Number(selected.dataset.price || 0) : 0;
  }

  function selectedSupportPrice() {
    const select = form.querySelector('select[name="supportPaket"]');
    const option = select && select.selectedOptions ? select.selectedOptions[0] : null;
    return option ? Number(option.dataset.price || 0) : 0;
  }

  function calculate() {
    const numbers = Math.max(1, Number(form.elements.aiRufnummern.value || 1));
    const monthly = selectedPackagePrice() + selectedSupportPrice() + numbers * 9;
    const once = form.elements.setupPaketPro.checked ? 990 : 0;
    if (monthlyEl) monthlyEl.textContent = euro.format(monthly);
    if (oneTimeEl) oneTimeEl.textContent = 'Einmalig: ' + euro.format(once);
    return { monthly, once };
  }

  form.querySelectorAll('[data-cost-input], input[name="minutenPaket"]').forEach(function (input) {
    input.addEventListener('change', calculate);
    input.addEventListener('input', calculate);
  });

  calculate();

  function getUtm() {
    const params = new URLSearchParams(window.location.search);
    return ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].reduce(function (acc, key) {
      if (params.has(key)) acc[key] = params.get(key);
      return acc;
    }, {});
  }

  function showStatus(message, isError) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.classList.toggle('error', Boolean(isError));
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const pricing = calculate();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (payload.website) {
      showStatus('Danke. Ihre Anfrage wurde aufgenommen.', false);
      return;
    }

    payload.setupPaketPro = form.elements.setupPaketPro.checked;
    payload.monatlichGesamt = pricing.monthly;
    payload.einmaligGesamt = pricing.once;
    payload.path = window.location.pathname;
    payload.pageTitle = document.title;
    payload.source = form.dataset.source || payload.sourcePage || 'Website';
    payload.utm = getUtm();
    payload.submittedAt = new Date().toISOString();

    try {
      submitButton.disabled = true;
      submitButton.textContent = 'Wird gesendet...';
      showStatus('Anfrage wird gesendet.', false);

      const response = await fetch('/api/configurator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(function () {
        return {};
      });

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Die Anfrage konnte nicht gesendet werden.');
      }

      localStorage.removeItem('kiTerminplanungLeadBackup');
      form.reset();
      calculate();
      showStatus('Danke. Die Anfrage ist angekommen. Wir melden uns mit einer konkreten Einschätzung.', false);
      if (window.plausible) window.plausible('Lead Formular abgesendet');
    } catch (error) {
      localStorage.setItem('kiTerminplanungLeadBackup', JSON.stringify(payload));
      showStatus(error.message || 'Fehler beim Senden. Die Eingaben wurden lokal gesichert.', true);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Analyse anfordern';
    }
  });
})();
