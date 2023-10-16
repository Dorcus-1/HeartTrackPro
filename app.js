// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

app.use(bodyParser.json());

// Endpoint to add a new patient
app.post('/patients', (req, res) => {
  const { name, temperature, heartbeat } = req.body;

  if (!name || !temperature || !heartbeat) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const insertPatient = db.prepare('INSERT INTO patients (name, temperature, heartbeat) VALUES (?, ?, ?)');
  insertPatient.run(name, temperature, heartbeat, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving patient data' });
    }
    return res.status(201).json({ message: 'Patient data saved successfully' });
  });
  insertPatient.finalize();
});

app.get('/patients', (req, res) => {
    const selectPatients = 'SELECT * FROM patients';
    db.all(selectPatients, (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching patient data' });
      }
      res.status(200).json(rows);
    });
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
