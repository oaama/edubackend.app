const jwt = require('jsonwebtoken');
const config = require('../config/config');

// ✅ وظيفة لتوليد توكن JWT
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, config.jwtSecret, {
    expiresIn: '7d', // التوكن صالح لمدة 7 أيام
  });
};

module.exports = generateToken;