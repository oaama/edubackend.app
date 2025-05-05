const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware'); // استدعاء Middleware رفع الصور

// ✅ تسجيل مستخدم جديد مع رفع الصور
router.post(
  '/register',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'collegeId', maxCount: 1 },
  ]),
  authController.register
);

// ✅ تسجيل الدخول
router.post('/login', authController.login);

module.exports = router;