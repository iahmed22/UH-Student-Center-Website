document.addEventListener('DOMContentLoaded', () => {
    const apiBaseUrl = window.location.port === '3000' ? '' : 'http://localhost:3000';
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
  