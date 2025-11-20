// assets/script.js - general site JS added for interaction (no changes to existing HTML)
(() => {
  // Sticky navbar
  const nav = document.querySelector('.navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) nav.classList.add('shadow-sm');
      else nav.classList.remove('shadow-sm');
    });
  }

  // Smooth scroll for internal anchor links
  document.querySelectorAll('a[href^="#"], a[href*="/#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href) return;
      // handle same-page anchors only
      if (href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });

  // Simple modal for images with data-img attribute
  document.querySelectorAll('[data-img-modal]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-img-modal');
      const title = el.getAttribute('data-title') || '';
      showModal(src, title);
    });
  });

  function showModal(src, title) {
    let modal = document.getElementById('eg-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'eg-modal';
      modal.style.position = 'fixed';
      modal.style.inset = '0';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.background = 'rgba(0,0,0,0.6)';
      modal.style.zIndex = '2000';
      modal.innerHTML = '<div style="max-width:900px;width:90%;background:#fff;border-radius:8px;padding:10px;position:relative;"><button id="eg-modal-close" style="position:absolute;right:8px;top:8px;border:none;background:#ff5b5b;color:#fff;padding:6px 10px;border-radius:6px;cursor:pointer">Close</button><h5 id="eg-modal-title"></h5><img id="eg-modal-img" style="width:100%;height:auto;border-radius:6px;display:block;margin-top:8px;" src=""></div>';
      document.body.appendChild(modal);
      document.getElementById('eg-modal-close').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.remove(); });
    }
    document.getElementById('eg-modal-img').src = src;
    document.getElementById('eg-modal-title').textContent = title;
  }

  // Contact form client-side validation (if form with id contactForm)
  const contactForm = document.getElementById('contactForm') || document.querySelector('form[action*="mailto"], form[action*="form"]');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const email = contactForm.querySelector('input[type="email"]');
      if (email && !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        email.focus();
      }
    });
  }

})();