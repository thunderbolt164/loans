function calculateEMI(principal, annualRate, months) {
  const monthlyRate = annualRate / 100 / 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
              (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

function calculateCreditScore(monthlyIncome, employmentType) {
  let baseScore = 650;
  
  if (monthlyIncome > 150000) baseScore += 100;
  else if (monthlyIncome > 100000) baseScore += 75;
  else if (monthlyIncome > 50000) baseScore += 50;
  
  if (employmentType === 'employed') baseScore += 50;
  else if (employmentType === 'business') baseScore += 30;
  
  const variance = Math.random() * 50 - 25;
  const finalScore = Math.min(900, Math.max(600, baseScore + variance));
  
  return Math.round(finalScore);
}

function calculateEligibilityScore(loanApp, bank) {
  let score = 50;
  
  if (loanApp.documents.bankStatement.verified) {
    const creditScore = loanApp.documents.bankStatement.creditScore;
    if (creditScore > 750) score += 25;
    else if (creditScore > 700) score += 20;
    else if (creditScore > 650) score += 15;
  }
  
  const emi = calculateEMI(loanApp.loanAmount, bank.baseInterestRate, loanApp.tenure * 12);
  const emiRatio = (emi / loanApp.monthlyIncome) * 100;
  
  if (emiRatio < 30) score += 20;
  else if (emiRatio < 40) score += 15;
  else if (emiRatio < 50) score += 10;
  else score -= 10;
  
  if (loanApp.documents.itr.verified || loanApp.documents.gst.verified) {
    score += 15;
  }
  
  return Math.min(100, score);
}

function generateDummyITRData(panNumber, monthlyIncome) {
  const annualIncome = monthlyIncome * 12;
  const variance = (Math.random() - 0.5) * annualIncome * 0.1;
  const totalIncome = Math.round(annualIncome + variance);
  
  return {
    pan: panNumber,
    totalIncome,
    financialYear: '2023-24',
    taxFiled: true,
    status: 'Verified',
    returnType: '1',
    grossTotal: totalIncome
  };
}

function generateDummyGSTData(gstNumber, businessName) {
  const turnover = Math.floor(Math.random() * 50000000) + 10000000;
  
  return {
    gst: gstNumber,
    businessName: businessName || 'Sample Business',
    state: 'Rajasthan',
    registrationDate: new Date(Date.now() - 365*24*60*60*1000 * Math.random()).toISOString(),
    turnover: turnover,
    returnsFiled: true,
    status: 'Active',
    compliance: 'Compliant'
  };
}

module.exports = {
  calculateEMI,
  calculateCreditScore,
  calculateEligibilityScore,
  generateDummyITRData,
  generateDummyGSTData
};