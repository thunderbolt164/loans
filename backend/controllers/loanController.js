const LoanApplication = require('../models/LoanApplication');
const ComparisonResult = require('../models/ComparisonResult');
const Bank = require('../models/Bank');
const { calculateEMI, calculateEligibilityScore } = require('../utils/calculations');

exports.createApplication = async (req, res) => {
  try {
    const { userId, loanType, loanAmount, tenure, employmentType, monthlyIncome } = req.body;
    
    const loanApp = new LoanApplication({
      userId,
      employmentType,
      monthlyIncome,
      loanType,
      loanAmount,
      tenure,
      applicationStatus: 'documents_pending'
    });
    
    await loanApp.save();
    
    res.json({ 
      message: 'Loan application created',
      applicationId: loanApp._id,
      status: loanApp.applicationStatus
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.compareLoans = async (req, res) => {
  try {
    const { loanApplicationId } = req.body;
    
    const loanApp = await LoanApplication.findById(loanApplicationId);
    
    const eligibleBanks = await Bank.find({
      loanType: loanApp.loanType,
      minAmount: { $lte: loanApp.loanAmount },
      maxAmount: { $gte: loanApp.loanAmount },
      minTenure: { $lte: loanApp.tenure },
      maxTenure: { $gte: loanApp.tenure },
      eligibleFor: loanApp.employmentType
    });
    
    const comparedBanks = eligibleBanks.map(bank => {
      const emi = calculateEMI(loanApp.loanAmount, bank.baseInterestRate, loanApp.tenure * 12);
      const totalCost = (emi * loanApp.tenure * 12) + bank.processingFee;
      const eligibilityScore = calculateEligibilityScore(loanApp, bank);
      
      let approvalProb = 'High';
      if (eligibilityScore < 60) approvalProb = 'Medium';
      if (eligibilityScore < 50) approvalProb = 'Low';
      
      return {
        bankId: bank._id,
        bankName: bank.bankName,
        bankType: bank.bankType,
        productName: bank.productName,
        interestRate: bank.baseInterestRate,
        emiAmount: emi,
        processingFee: bank.processingFee,
        totalCost,
        approvalProbability: approvalProb,
        eligibilityMatch: eligibilityScore,
        features: bank.features
      };
    }).sort((a, b) => {
      if (b.eligibilityMatch !== a.eligibilityMatch) {
        return b.eligibilityMatch - a.eligibilityMatch;
      }
      return a.interestRate - b.interestRate;
    });
    
    const recommendedBank = comparedBanks[0];
    const eligibilityScore = calculateEligibilityScore(loanApp, eligibleBanks[0]);
    
    await LoanApplication.findByIdAndUpdate(
      loanApplicationId,
      { 
        eligibilityScore,
        applicationStatus: 'under_review'
      }
    );
    
    const comparison = new ComparisonResult({
      loanApplicationId,
      userId: loanApp.userId,
      loanAmount: loanApp.loanAmount,
      tenure: loanApp.tenure,
      eligibilityScore,
      comparedBanks,
      recommendedBankId: recommendedBank.bankId,
      recommendedBankName: recommendedBank.bankName,
      recommendedEmi: recommendedBank.emiAmount,
      recommendedRate: recommendedBank.interestRate
    });
    
    await comparison.save();
    
    res.json({
      success: true,
      comparedBanks,
      recommendedBank,
      eligibilityScore,
      totalBanksAvailable: comparedBanks.length
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.submitToBank = async (req, res) => {
  try {
    const { loanApplicationId, selectedBankId } = req.body;
    
    const loanApp = await LoanApplication.findById(loanApplicationId);
    const bank = await Bank.findById(selectedBankId);
    const User = require('../models/User');
    const user = await User.findById(loanApp.userId);
    
    if (!loanApp.documents.itr.verified && !loanApp.documents.gst.verified) {
      return res.status(400).json({ error: 'At least ITR or GST verification required' });
    }
    
    if (!loanApp.documents.bankStatement.verified) {
      return res.status(400).json({ error: 'Bank statement verification required' });
    }
    
    const emi = calculateEMI(loanApp.loanAmount, bank.baseInterestRate, loanApp.tenure * 12);
    
    await LoanApplication.findByIdAndUpdate(
      loanApplicationId,
      {
        selectedBankId,
        selectedBankName: bank.bankName,
        approvedEmi: emi,
        approvedInterestRate: bank.baseInterestRate,
        applicationStatus: 'approved'
      }
    );
    
    const submissionData = {
      applicant: {
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      loanDetails: {
        amount: loanApp.loanAmount,
        tenure: loanApp.tenure,
        type: loanApp.loanType,
        emi,
        interestRate: bank.baseInterestRate,
        processingFee: bank.processingFee,
        totalCost: (emi * loanApp.tenure * 12) + bank.processingFee
      },
      verification: {
        itr: loanApp.documents.itr.verified ? {
          verified: true,
          totalIncome: loanApp.documents.itr.totalIncome,
          verificationId: loanApp.documents.itr.verificationId
        } : null,
        gst: loanApp.documents.gst.verified ? {
          verified: true,
          turnover: loanApp.documents.gst.businessTurnover,
          verificationId: loanApp.documents.gst.verificationId
        } : null,
        creditScore: loanApp.documents.bankStatement.creditScore,
        averageBalance: loanApp.documents.bankStatement.averageBalance
      },
      timestamp: new Date(),
      sourceBank: 'LoanComparePlatform'
    };
    
    res.json({
      success: true,
      message: 'Application submitted to bank',
      bankName: bank.bankName,
      bankApiEndpoint: bank.apiEndpoint,
      submissionData,
      emi,
      approvalStatus: 'Pending Review'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getApplication = async (req, res) => {
  try {
    const loanApp = await LoanApplication.findById(req.params.loanApplicationId)
      .populate('userId', 'name email phone monthlyIncome');
    
    res.json(loanApp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const applications = await LoanApplication.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};