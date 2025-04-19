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

// In-memory storage
const bookings = {}; // Format: { "room_date_time": { ...bookingData } }

// POST
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

// Current bookings
app.get('/bookings', (req, res) => {
  res.json(bookings);
});

// GET 
app.get('/check-availability', (req, res) => {
  const { room, date, time } = req.query;
  const bookingKey = `${room}_${date}_${time}`;

  if (!room || !date || !time) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  if (bookings[bookingKey]) {
    return res.json({ available: false });
  }

  res.json({ available: true });
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
