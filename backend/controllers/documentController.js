const LoanApplication = require('../models/LoanApplication');
const { generateDummyITRData, generateDummyGSTData, calculateCreditScore } = require('../utils/calculations');

exports.verifyITR = async (req, res) => {
  try {
    const { panNumber, itrPassword, loanApplicationId } = req.body;
    
    if (!panNumber || !itrPassword) {
      return res.status(400).json({ error: 'PAN and password required' });
    }
    
    const loanApp = await LoanApplication.findById(loanApplicationId);
    const itrData = generateDummyITRData(panNumber, loanApp.monthlyIncome);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await LoanApplication.findByIdAndUpdate(
      loanApplicationId,
      {
        'documents.itr.panNumber': panNumber,
        'documents.itr.verified': true,
        'documents.itr.totalIncome': itrData.totalIncome,
        'documents.itr.verificationId': `ITR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        'documents.itr.verifiedAt': new Date()
      }
    );
    
    res.json({ 
      verified: true,
      data: itrData,
      message: 'ITR verified successfully',
      verificationId: `ITR-${Date.now()}`
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyGST = async (req, res) => {
  try {
    const { gstNumber, gstPassword, businessName, loanApplicationId } = req.body;
    
    if (!gstNumber || !gstPassword) {
      return res.status(400).json({ error: 'GST and password required' });
    }
    
    const gstData = generateDummyGSTData(gstNumber, businessName);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await LoanApplication.findByIdAndUpdate(
      loanApplicationId,
      {
        'documents.gst.gstNumber': gstNumber,
        'documents.gst.verified': true,
        'documents.gst.businessTurnover': gstData.turnover,
        'documents.gst.verificationId': `GST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        'documents.gst.verifiedAt': new Date()
      }
    );
    
    res.json({ 
      verified: true,
      data: gstData,
      message: 'GST verified successfully',
      verificationId: `GST-${Date.now()}`
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyBankStatement = async (req, res) => {
  try {
    const { loanApplicationId } = req.body;
    
    const loanApp = await LoanApplication.findById(loanApplicationId);
    const creditScore = calculateCreditScore(loanApp.monthlyIncome, loanApp.employmentType);
    const averageBalance = loanApp.monthlyIncome * (3 + Math.random() * 2);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    await LoanApplication.findByIdAndUpdate(
      loanApplicationId,
      {
        'documents.bankStatement.verified': true,
        'documents.bankStatement.averageBalance': Math.round(averageBalance),
        'documents.bankStatement.creditScore': creditScore,
        'documents.bankStatement.verifiedAt': new Date()
      }
    );
    
    res.json({ 
      verified: true,
      data: {
        creditScore,
        averageBalance: Math.round(averageBalance),
        bankStatement: 'Bank statement analysis complete'
      },
      message: 'Bank statement verified successfully'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVerificationStatus = async (req, res) => {
  try {
    const loanApp = await LoanApplication.findById(req.params.loanApplicationId);
    
    res.json({
      applicationId: loanApp._id,
      status: loanApp.applicationStatus,
      documents: {
        itr: {
          verified: loanApp.documents.itr.verified,
          verifiedAt: loanApp.documents.itr.verifiedAt
        },
        gst: {
          verified: loanApp.documents.gst.verified,
          verifiedAt: loanApp.documents.gst.verifiedAt
        },
        bankStatement: {
          verified: loanApp.documents.bankStatement.verified,
          creditScore: loanApp.documents.bankStatement.creditScore,
          verifiedAt: loanApp.documents.bankStatement.verifiedAt
        }
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};