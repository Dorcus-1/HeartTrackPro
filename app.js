const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const db = require('./db.js'); // Import the database module

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Handle POST request to add a patient
app.post('/patients', (req, res) => {
  const { name, bodyTemp, heartRate, patients_NID, frequent_sickness } = req.body;

  if (!name || !bodyTemp || !heartRate || !patients_NID || !frequent_sickness) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

db.addPatient(name, bodyTemp, heartRate, patients_NID, frequent_sickness, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.status(201).json({ message: 'Patient information received successfully.' });
  });
});

// Render a page displaying patient data with Chart.js
app.get('/chart', (req, res) => {
  db.getAllPatients((err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('chart', { patients: rows });
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
