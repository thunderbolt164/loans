const mongoose = require('mongoose');

const bankStatementSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  loanApplicationId: mongoose.Schema.Types.ObjectId,
  averageBalance: Number,
  incomingAmount: Number,
  outgoingAmount: Number,
  creditScore: Number,
  analysisDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BankStatement', bankStatementSchema);