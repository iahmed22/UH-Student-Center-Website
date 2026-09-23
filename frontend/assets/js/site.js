document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.search-icon-btn');
  const search = document.querySelector('.site-search');
  const input = search?.querySelector('input');
  const status = search?.querySelector('.site-search-status');

  if (!header || !toggle || !search || !input || !status) return;

  const pagePrefix = window.location.pathname.includes('/pages/') ? '' : 'pages/';
  const pages = {
    home: pagePrefix ? '../index.html' : 'index.html',
    about: `${pagePrefix}about.html`,
    campus: `${pagePrefix}rooms.html`,
    rooms: `${pagePrefix}rooms.html`,
    booking: `${pagePrefix}booking.html`,
    reserve: `${pagePrefix}booking.html`,
    faq: `${pagePrefix}about.html`,
  };

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('search-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    search.style.clipPath = isOpen ? 'inset(0)' : 'inset(0 0 0 100%)';
    if (isOpen) input.focus();
  });

  search.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim().toLowerCase();
    const destination = pages[query];

    if (!query) {
      status.textContent = 'Type a page name to search.';
      return;
    }

    if (!destination) {
      status.textContent = 'Try Home, About, Campus, Rooms, FAQ, or Booking.';
      return;
    }

    window.location.href = destination;
  });

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) {
      header.classList.remove('search-open');
      toggle.setAttribute('aria-expanded', 'false');
      search.style.clipPath = 'inset(0 0 0 100%)';
    }
  });
});
