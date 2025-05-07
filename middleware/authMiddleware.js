const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization'); // التوكن بيجي في الهيدر
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '❌ Access Denied: لازم تكون مسجل دخول!' });
  }

  const token = authHeader.split(' ')[1]; // استخراج التوكن من الهيدر

  try {
    // فك التوكن والتحقق منه
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // جلب بيانات المستخدم من قاعدة البيانات
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: '❌ Invalid Token: المستخدم غير موجود!' });
    }

    // التحقق من أن التوكن نشط
    if (user.activeToken !== token) {
      return res.status(401).json({ message: '❌ Invalid Token: التوكن غير نشط!' });
    }

    req.user = user; // إضافة بيانات المستخدم إلى الطلب
    next();
  } catch (err) {
    console.error('❌ Error verifying token:', err.message);
    res.status(401).json({ message: '❌ Invalid Token: التوكن غير صالح!' });
  }
};

module.exports = authMiddleware;