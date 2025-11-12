const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  department: String,
  title: String,
  phone: String,
  location: String,
  avatarUrl: String
}, { timestamps: true });
module.exports = mongoose.model('Employee', EmployeeSchema);
