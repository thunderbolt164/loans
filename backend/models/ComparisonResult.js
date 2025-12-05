const mongoose = require('mongoose');

const comparisonResultSchema = new mongoose.Schema({
  loanApplicationId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  loanAmount: Number,
  tenure: Number,
  eligibilityScore: Number,
  comparedBanks: [{
    bankId: mongoose.Schema.Types.ObjectId,
    bankName: String,
    bankType: String,
    productName: String,
    interestRate: Number,
    emiAmount: Number,
    processingFee: Number,
    totalCost: Number,
    approvalProbability: String,
    eligibilityMatch: Number
  }],
  recommendedBankId: mongoose.Schema.Types.ObjectId,
  recommendedBankName: String,
  recommendedEmi: Number,
  recommendedRate: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ComparisonResult', comparisonResultSchema);