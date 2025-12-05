const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });
    
    await user.save();
    res.json({ 
      message: 'Registration successful', 
      userId: user._id,
      email: user.email 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ 
      message: 'Login successful',
      token, 
      userId: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEmploymentInfo = async (req, res) => {
  try {
    const { userId, employmentType, monthlyIncome, panNumber, gstNumber } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        employmentType, 
        monthlyIncome,
        panNumber: panNumber || '',
        gstNumber: gstNumber || ''
      },
      { new: true }
    );
    
    res.json({ 
      message: 'Employment info saved',
      user 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};