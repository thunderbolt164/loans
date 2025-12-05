const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.post('/create-application', loanController.createApplication);
router.post('/compare', loanController.compareLoans);
router.post('/submit-to-bank', loanController.submitToBank);
router.get('/:loanApplicationId', loanController.getApplication);
router.get('/user/:userId/applications', loanController.getUserApplications);

module.exports = router;