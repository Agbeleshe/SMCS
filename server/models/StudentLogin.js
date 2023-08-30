const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  age: Number,
  sponsor: String,
  ambition: String,
  prefectship: String,
  studentClass: String,
  gender: String,
  hobbies: String,
  stateOfOrigin: String,
  funFact: String,
  resultFile: {
    filename: String, // Original filename
    path: String, // Path to the stored file on the server
  },
  message: String,
});



const StudentModel = mongoose.model('registeredStudents', StudentSchema);

module.exports = StudentModel;
