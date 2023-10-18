
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('patients.db');

db.run(`CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY,
  name TEXT,
  bodyTemp TEXT,
  heartRate INTEGER,
  patients_NID TEXT,
  frequent_sickness TEXT
)`);

function addPatient(name, bodyTemp, heartRate, patients_NID, frequent_sickness, callback) {
  const sql = 'INSERT INTO patients (name, bodyTemp, heartRate, patients_NID, frequent_sickness) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [name, bodyTemp, heartRate, patients_NID, frequent_sickness], callback);
}

// Function to retrieve all patients
function getAllPatients(callback) {
  const sql = 'SELECT * FROM patients';
  db.all(sql, [], callback);
}


module.exports ={
  db,
  addPatient,
  getAllPatients

} 

