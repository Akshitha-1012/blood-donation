(function() {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close menu when clicking a link (mobile)
    primaryNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Simple form helpers
  function showError(input, message) {
    const container = input.closest('.form-field');
    if (!container) return;
    const errorEl = container.querySelector('.error');
    if (errorEl) errorEl.textContent = message || '';
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateRequired(input) {
    if (input.hasAttribute('required') && !input.value.trim()) {
      showError(input, 'This field is required');
      return false;
    }
    showError(input, '');
    return true;
  }

  function attachValidation(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateRequired(input));
      input.addEventListener('input', () => showError(input, ''));
    });
  }

  // Donor form
  const donorForm = document.getElementById('donor-form');
  if (donorForm) {
    attachValidation(donorForm);
    donorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const requiredInputs = donorForm.querySelectorAll('input[required], select[required], textarea[required]');
      let allValid = true;
      requiredInputs.forEach(i => { if (!validateRequired(i)) allValid = false; });
      if (!allValid) return;
      notify('Thank you for registering as a donor! We will contact you soon.', 'success');
      donorForm.reset();
    });
  }

  // Recipient form
  const recipientForm = document.getElementById('recipient-form');
  if (recipientForm) {
    attachValidation(recipientForm);
    recipientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const requiredInputs = recipientForm.querySelectorAll('input[required], select[required], textarea[required]');
      let allValid = true;
      requiredInputs.forEach(i => { if (!validateRequired(i)) allValid = false; });
      if (!allValid) return;
      notify('Your blood request has been submitted. We will reach out shortly.', 'success');
      recipientForm.reset();
    });
  }

  // Locator search (dummy)
  const locatorForm = document.getElementById('locator-form');
  if (locatorForm) {
    locatorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = /** @type {HTMLInputElement} */(document.getElementById('search-location'))?.value?.trim();
      if (!q) { notify('Please enter a city or pin code to search.', 'warning'); return; }
      notify(`Searching drives near: ${q} (demo)`, 'info');
    });
  }

  // Simple toast notifications (placeholder for future integrations)
  function notify(message, type = 'info') {
    const area = document.getElementById('notification-area');
    if (!area) return alert(message); // fallback
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.role = 'status';
    toast.ariaLive = 'polite';
    toast.textContent = message;
    area.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // Minimal styles for toasts injected here to keep CSS single-file friendly
  const style = document.createElement('style');
  style.textContent = `
    .toast{position:fixed;right:16px;bottom:16px;background:#0e1628;border:1px solid var(--border);padding:10px 14px;border-radius:12px;opacity:.0;transform:translateY(8px);transition:all .25s ease;z-index:1000}
    .toast.show{opacity:1;transform:translateY(0)}
    .toast-success{border-color:#065f46;box-shadow:0 0 0 3px rgba(16,185,129,.15)}
    .toast-warning{border-color:#92400e;box-shadow:0 0 0 3px rgba(245,158,11,.15)}
    .toast-info{border-color:#1f2937;}
  `;
  document.head.appendChild(style);
})();


