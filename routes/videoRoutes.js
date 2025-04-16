const express = require('express');
const router = express.Router();
const { addVideo, getVideosByCourse } = require('../controllers/videoController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// ✅ إضافة فيديو جديد (للـ Instructors فقط)
router.post(
  '/add',
  authMiddleware, // التحقق من تسجيل الدخول
  roleMiddleware(['instructor']), // التحقق من الصلاحيات
  upload.single('video'), // رفع فيديو واحد
  addVideo
);

// ✅ جلب الفيديوهات الخاصة بكورس معين
router.get(
  '/course/:courseId',
  authMiddleware, // التحقق من تسجيل الدخول
  getVideosByCourse
);

module.exports = router;