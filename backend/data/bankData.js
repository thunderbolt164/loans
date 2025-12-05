// data/bankData.js
const REAL_BANKS_DATA = [
  // PERSONAL LOANS - GOVERNMENT BANKS
  {
    bankName: 'State Bank of India',
    bankType: 'government',
    productName: 'SBI Xpress Credit',
    loanType: 'personal',
    minAmount: 100000,
    maxAmount: 2500000,
    minTenure: 6,
    maxTenure: 60,
    baseInterestRate: 9.25,
    processingFee: 10000,
    eligibleFor: ['employed', 'self-employed'],
    documentRequirements: ['ITR', 'Bank Statement', 'Salary Slip', 'Aadhaar'],
    features: ['No collateral', 'Quick approval', 'Flexible tenure'],
    apiEndpoint: 'https://sbi.co.in/loan-application'
  },
  {
    bankName: 'Bank of India',
    bankType: 'government',
    productName: 'BOI Personal Loan',
    loanType: 'personal',
    minAmount: 100000,
    maxAmount: 2500000,
    minTenure: 6,
    maxTenure: 60,
    baseInterestRate: 11.10,
    processingFee: 5000,
    eligibleFor: ['employed', 'self-employed'],
    documentRequirements: ['ITR', 'Bank Statement', 'Salary Slip', 'Aadhaar'],
    features: ['Special rates for doctors', 'Good credit score benefits', 'Flexible tenure'],
    apiEndpoint: 'https://boi.com/loan-application'
  },
  {
    bankName: 'Punjab National Bank',
    bankType: 'government',
    productName: 'PNB Personal Loan',
    loanType: 'personal',
    minAmount: 100000,
    maxAmount: 1000000,
    minTenure: 6,
    maxTenure: 48,
    baseInterestRate: 10.50,
    processingFee: 8000,
    eligibleFor: ['employed'],
    documentRequirements: ['Salary Slip', 'Bank Statement', 'Aadhaar'],
    features: ['Must have salary account', 'Quick approval', 'Low documentation'],
    apiEndpoint: 'https://pnb.com/loan-application'
  },

  // PERSONAL LOANS - PRIVATE BANKS
  {
    bankName: 'HDFC Bank',
    bankType: 'nbfc',
    productName: 'HDFC Personal Loan',
    loanType: 'personal',
    minAmount: 200000,
    maxAmount: 4000000,
    minTenure: 12,
    maxTenure: 60,
    baseInterestRate: 9.00,
    processingFee: 12000,
    eligibleFor: ['employed', 'self-employed'],
    documentRequirements: ['ITR', 'Bank Statement', 'Salary Slip', 'Aadhaar', 'DigiLocker'],
    features: ['Lowest rates from private sector', 'Fast approval', 'Flexible repayment', 'EMI holiday'],
    apiEndpoint: 'https://hdfc.com/loan-application'
  },
  {
    bankName: 'ICICI Bank',
    bankType: 'nbfc',
    productName: 'ICICI Personal Loan',
    loanType: 'personal',
    minAmount: 150000,
    maxAmount: 3500000,
    minTenure: 12,
    maxTenure: 60,
    baseInterestRate: 9.50,
    processingFee: 11000,
    eligibleFor: ['employed', 'self-employed'],
    documentRequirements: ['ITR', 'Bank Statement', 'Salary Slip', 'Aadhaar'],
    features: ['Digital application', 'Credit score based rates', 'Online documents'],
    apiEndpoint: 'https://icici.com/loan-application'
  },
  {
    bankName: 'Axis Bank',
    bankType: 'nbfc',
    productName: 'Axis Personal Loan',
    loanType: 'personal',
    minAmount: 150000,
    maxAmount: 4000000,
    minTenure: 12,
    maxTenure: 60,
    baseInterestRate: 9.75,
    processingFee: 10500,
    eligibleFor: ['employed', 'self-employed'],
    documentRequirements: ['ITR', 'Bank Statement', 'Salary Slip', 'Aadhaar'],
    features: ['Instant approval', 'Balance transfer facility', 'Pre-approved offers'],
    apiEndpoint: 'https://axisbank.com/loan-application'
  },

  // BUSINESS LOANS - GOVERNMENT BANKS
  {
    bankName: 'State Bank of India',
    bankType: 'government',
    productName: 'SBI Business Loan',
    loanType: 'business',
    minAmount: 500000,
    maxAmount: 5000000,
    minTenure: 24,
    maxTenure: 60,
    baseInterestRate: 9.90,
    processingFee: 15000,
    eligibleFor: ['business', 'self-employed'],
    documentRequirements: ['GST', 'ITR', 'Bank Statement', 'Business Registration'],
    features: ['Linked to MCLR', 'No collateral needed', 'Business must be 5 years old'],
    apiEndpoint: 'https://sbi.co.in/business-loan'
  },

  // BUSINESS LOANS - PRIVATE BANKS
  {
    bankName: 'YES Bank',
    bankType: 'nbfc',
    productName: 'YES Bank Business Loan',
    loanType: 'business',
    minAmount: 500000,
    maxAmount: 6000000,
    minTenure: 12,
    maxTenure: 60,
    baseInterestRate: 10.50,
    processingFee: 20000,
    eligibleFor: ['business', 'self-employed'],
    documentRequirements: ['GST', 'ITR', 'Bank Statement', 'Financial Statements'],
    features: ['Unsecured loan', 'Instant for existing customers', 'No collateral'],
    apiEndpoint: 'https://yesbank.com/business-loan'
  },
  {
    bankName: 'Kotak Mahindra Bank',
    bankType: 'nbfc',
    productName: 'Kotak Business Loan',
    loanType: 'business',
    minAmount: 300000,
    maxAmount: 7500000,
    minTenure: 12,
    maxTenure: 60,
    baseInterestRate: 11.00,
    processingFee: 18000,
    eligibleFor: ['business', 'self-employed'],
    documentRequirements: ['GST', 'ITR', 'Bank Statement', '3 year business history'],
    features: ['Based on BPLR', 'Quick processing', 'Flexible tenure'],
    apiEndpoint: 'https://kotak.com/business-loan'
  },

  // HOME LOANS - GOVERNMENT BANKS
  {
    bankName: 'State Bank of India',
    bankType: 'government',
    productName: 'SBI Home Loan',
    loanType: 'home',
    minAmount: 500000,
    maxAmount: 50000000,
    minTenure: 120,
    maxTenure: 300,
    baseInterestRate: 7.75,
    processingFee: 10000,
    eligibleFor: ['employed', 'self-employed', 'business'],
    documentRequirements: ['ITR', 'Bank Statement', 'Salary Slip', 'Property Documents'],
    features: ['Best rates for government employees', 'Long tenure available', 'No prepayment charges'],
    apiEndpoint: 'https://sbi.co.in/home-loan'
  },

  // HOME LOANS - PRIVATE BANKS
  {
    bankName: 'HDFC Bank',
    bankType: 'nbfc',
    productName: 'HDFC Home Loan',
    loanType: 'home',
    minAmount: 500000,
    maxAmount: 50000000,
    minTenure: 120,
    maxTenure: 300,
    baseInterestRate: 7.35,
    processingFee: 15000,
    eligibleFor: ['employed', 'self-employed'],
    documentRequirements: ['ITR', 'Bank Statement', 'Salary Slip', 'Property Valuation'],
    features: ['Lowest home loan rates', 'Floating rate option', 'Online processing'],
    apiEndpoint: 'https://hdfc.com/home-loan'
  },

  // AUTO LOANS
  {
    bankName: 'State Bank of India',
    bankType: 'government',
    productName: 'SBI Auto Loan',
    loanType: 'auto',
    minAmount: 300000,
    maxAmount: 5000000,
    minTenure: 24,
    maxTenure: 84,
    baseInterestRate: 8.50,
    processingFee: 8000,
    eligibleFor: ['employed', 'self-employed', 'business'],
    documentRequirements: ['Salary Slip', 'Bank Statement', 'Aadhaar', 'Vehicle Quotes'],
    features: ['Loan against vehicle', 'Easy documentation', 'Quick disbursement'],
    apiEndpoint: 'https://sbi.co.in/auto-loan'
  }
];

module.exports = REAL_BANKS_DATA;