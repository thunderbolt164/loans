const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bank = require('../models/Bank');
const REAL_BANKS_DATA = require('../data/bankData');

dotenv.config();

const initializeData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Bank.deleteMany({});
    console.log('✓ Cleared existing bank data');

    // Insert real BankBazaar data
    await Bank.insertMany(REAL_BANKS_DATA);
    console.log(`✓ Inserted ${REAL_BANKS_DATA.length} banks from BankBazaar data`);

    // Display summary
    const bankCount = await Bank.countDocuments();
    const loanTypes = await Bank.distinct('loanType');
    
    console.log('\n📊 Database Summary:');
    console.log(`Total Banks: ${bankCount}`);
    console.log('Loan Types Available:', loanTypes.join(', '));
    
    // Show banks by type
    for (let type of loanTypes) {
      const count = await Bank.countDocuments({ loanType: type });
      console.log(`- ${type}: ${count} banks`);
    }

    console.log('\n✅ Real BankBazaar data initialization completed!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Initialization failed:', error);
    process.exit(1);
  }
};

initializeData();