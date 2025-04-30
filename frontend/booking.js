document.addEventListener('DOMContentLoaded', () => {
    // Auto-fill room field from query param
    const params = new URLSearchParams(window.location.search);
    const room = params.get("room");
    if (room) {
      document.getElementById("room").value = decodeURIComponent(room);
    }
  
    // Fetch
    const form = document.getElementById('booking-form');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
      try {
        const response = await fetch('http://localhost:3000/submit-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert(result.message);
          form.reset();
        } else {
          alert(result.message);
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong. Please try again later.');
      }
    });
  });
  