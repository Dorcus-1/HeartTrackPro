class Patient {
    constructor(name, bodyTemp, heartRate, patient_NID,frequent_sickness) {
      this.name = name;
      this.patient_NID= patient_NID;
      this.bodyTemp = bodyTemp;
      this.heartRate = heartRate;
      this.frequent_sickness= frequent_sickness;
    }
  }
  
  module.exports = Patient;