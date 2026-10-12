document.addEventListener('DOMContentLoaded', () => {
    const isLocalHost = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
    const apiBaseUrl = window.location.port === '3000'
      ? ''
      : (window.BOOKING_API_BASE_URL || (isLocalHost ? 'http://localhost:3000' : ''));
    const status = document.createElement('p');
    status.className = 'booking-status';
    status.setAttribute('role', 'status');

    const params = new URLSearchParams(window.location.search);
    const room = params.get("room");
    if (room) {
      document.getElementById("room").value = decodeURIComponent(room);
    }

    const form = document.getElementById('booking-form');
    form.append(status);
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!apiBaseUrl && window.location.port !== '3000') {
        status.textContent = 'The booking service is not configured. Set its URL in assets/js/config.js after hosting the backend.';
        status.className = 'booking-status is-error';
        return;
      }

      status.textContent = 'Sending booking...';
      status.className = 'booking-status is-pending';
  
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
      try {
        const response = await fetch(`${apiBaseUrl}/submit-booking`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          status.textContent = result.message;
          status.className = 'booking-status is-success';
          form.reset();
        } else {
          status.textContent = result.message;
          status.className = 'booking-status is-error';
        }
      } catch (err) {
        console.error(err);
        status.textContent = 'The booking service is offline. Start the backend with npm start and try again.';
        status.className = 'booking-status is-error';
      }
    });
  });
  