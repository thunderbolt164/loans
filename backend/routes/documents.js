const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/verify/itr', documentController.verifyITR);
router.post('/verify/gst', documentController.verifyGST);
router.post('/verify/bank-statement', documentController.verifyBankStatement);
router.get('/:loanApplicationId/verification-status', documentController.getVerificationStatus);

module.exports = router;