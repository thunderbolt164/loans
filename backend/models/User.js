const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  employmentType: { type: String, enum: ['employed', 'business', 'self-employed'] },
  monthlyIncome: Number,
  panNumber: String,
  gstNumber: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);