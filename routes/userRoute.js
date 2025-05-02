const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/uploadMiddleware'); // Middleware لرفع الملفات

// ✅ جلب كل المستخدمين
router.get('/', userController.getAllUsers);

// ✅ تسجيل مستخدم جديد
router.post('/register', userController.register);

// ✅ تحديث بيانات مستخدم
router.put('/:id', userController.updateUser);

// ✅ حذف مستخدم
router.delete('/:id', userController.deleteUser);

// ✅ رفع صورة الملف الشخصي
router.post('/profile/upload', upload.single('profileImage'), userController.uploadProfileImage);

module.exports = router;