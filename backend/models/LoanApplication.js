const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  employmentType: String,
  monthlyIncome: Number,
  documents: {
    itr: { 
      panNumber: String,
      password: String,
      verified: Boolean,
      totalIncome: Number,
      verificationId: String,
      verifiedAt: Date
    },
    gst: { 
      gstNumber: String,
      password: String,
      verified: Boolean,
      businessTurnover: Number,
      verificationId: String,
      verifiedAt: Date
    },
    bankStatement: { 
      verified: Boolean,
      averageBalance: Number,
      creditScore: Number,
      verifiedAt: Date
    }
  },
  loanType: { type: String, enum: ['personal', 'business', 'home', 'auto'] },
  loanAmount: Number,
  tenure: Number,
  eligibilityScore: Number,
  applicationStatus: { type: String, enum: ['draft', 'documents_pending', 'under_review', 'approved', 'rejected'] },
  selectedBankId: mongoose.Schema.Types.ObjectId,
  selectedBankName: String,
  approvedEmi: Number,
  approvedInterestRate: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);