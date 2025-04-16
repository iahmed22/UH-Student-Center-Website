// start your backend for the project with this file

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In-memory storage for bookings
const bookings = {}; // Format: { "room_date_time": { ...bookingData } }

// POST endpoint to handle booking form
app.post('/submit-booking', (req, res) => {
  const { room, name, email, date, time } = req.body;

  if (!room || !name || !email || !date || !time) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const bookingKey = `${room}_${date}_${time}`;

  if (bookings[bookingKey]) {
    return res.status(409).json({
      message: `Sorry, ${room} is already booked on ${date} at ${time}.`,
    });
  }

  bookings[bookingKey] = { room, name, email, date, time };

  res.status(200).json({
    message: `Booking confirmed for ${room} on ${date} at ${time}.`,
  });
});

// Optional: view current bookings
app.get('/bookings', (req, res) => {
  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
