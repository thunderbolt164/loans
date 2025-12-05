const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');

// Initialize with real BankBazaar data
router.post('/init-banks', bankController.initializeBanks);

// Get all banks
router.get('/', bankController.getAllBanks);

// Get banks by loan type
router.get('/type/:loanType', bankController.getBanksByType);

// Get bank statistics
router.get('/stats', bankController.getBankStats);

// Search banks
router.get('/search', bankController.searchBanks);

// Get specific bank by ID
router.get('/:id', async (req, res) => {
  try {
    const Bank = require('../models/Bank');
    const bank = await Bank.findById(req.params.id);
    
    if (!bank) {
      return res.status(404).json({ error: 'Bank not found' });
    }
    
    res.json({
      success: true,
      data: bank
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;