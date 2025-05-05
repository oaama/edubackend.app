const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ✅ تسجيل مستخدم جديد مع رفع الصور
router.post('/register', authController.uploadMiddleware, authController.register);

// ✅ تسجيل الدخول
router.post('/login', authController.login);

module.exports = router;