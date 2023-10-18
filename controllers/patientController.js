const Patient = require('../models/Patient');

const patients = [];

// Add a patient
function addPatient(name,patient_NID, bodyTemp, heartRate,frequent_sickness) {
  const patient = new Patient(name,patient_NID, bodyTemp, heartRate,frequent_sickness);
  patients.push(patient);
}

// Get all patients
function getAllPatients() {
  return patients;
}

module.exports = {
  addPatient,
  getAllPatients,
};