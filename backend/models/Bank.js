const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  bankName: String,
  bankType: { type: String, enum: ['government', 'nbfc'] },
  productName: String,
  loanType: String,
  minAmount: Number,
  maxAmount: Number,
  minTenure: Number,
  maxTenure: Number,
  baseInterestRate: Number,
  processingFee: Number,
  eligibleFor: [String],
  documentRequirements: [String],
  features: [String],
  apiEndpoint: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bank', bankSchema);