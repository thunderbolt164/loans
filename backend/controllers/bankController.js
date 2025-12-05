const Bank = require('../models/Bank');
const REAL_BANKS_DATA = require('../data/bankData');

exports.initializeBanks = async (req, res) => {
  try {
    // Clear existing banks
    await Bank.deleteMany({});
    
    // Insert real BankBazaar data
    await Bank.insertMany(REAL_BANKS_DATA);
    
    res.json({ 
      message: 'Real BankBazaar data initialized successfully', 
      count: REAL_BANKS_DATA.length,
      banks: REAL_BANKS_DATA.map(bank => ({
        bankName: bank.bankName,
        productName: bank.productName,
        loanType: bank.loanType
      }))
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBanks = async (req, res) => {
  try {
    const banks = await Bank.find().sort({ bankName: 1, loanType: 1 });
    
    res.json({
      success: true,
      count: banks.length,
      data: banks
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBanksByType = async (req, res) => {
  try {
    const { loanType } = req.params;
    const banks = await Bank.find({ loanType }).sort({ baseInterestRate: 1 });
    
    res.json({
      success: true,
      loanType,
      count: banks.length,
      data: banks
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBankStats = async (req, res) => {
  try {
    const stats = await Bank.aggregate([
      {
        $group: {
          _id: '$loanType',
          count: { $sum: 1 },
          banks: { $addToSet: '$bankName' },
          minInterest: { $min: '$baseInterestRate' },
          maxInterest: { $max: '$baseInterestRate' },
          avgInterest: { $avg: '$baseInterestRate' }
        }
      }
    ]);
    
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchBanks = async (req, res) => {
  try {
    const { query, loanType, bankType } = req.query;
    
    let searchCriteria = {};
    
    if (query) {
      searchCriteria.$or = [
        { bankName: { $regex: query, $options: 'i' } },
        { productName: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (loanType) {
      searchCriteria.loanType = loanType;
    }
    
    if (bankType) {
      searchCriteria.bankType = bankType;
    }
    
    const banks = await Bank.find(searchCriteria).sort({ baseInterestRate: 1 });
    
    res.json({
      success: true,
      count: banks.length,
      data: banks
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};