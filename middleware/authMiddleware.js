const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization'); // التوكن بيجي في الهيدر
  if (!token) {
    return res.status(401).json({ message: '❌ Access Denied: لازم تكون مسجل دخول!' });
  }

  try {
    // فك التوكن والتحقق منه
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password'); // جلب بيانات المستخدم بدون كلمة المرور
    next();
  } catch (err) {
    res.status(401).json({ message: '❌ Invalid Token: التوكن غير صالح!' });
  }
};

module.exports = authMiddleware;