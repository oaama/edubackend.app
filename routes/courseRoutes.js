const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Middleware رفع الملفات

// ✅ جلب كل الكورسات
router.get('/', courseController.getAllCourses);

// ✅ جلب كورس معين بالـ ID
router.get('/:id', courseController.getCourseById);

// ✅ إنشاء كورس جديد (للـ Instructors فقط) مع رفع صورة
router.post(
  '/create',
  authMiddleware,
  roleMiddleware(['instructor']),
  upload.single('courseImage'), // إضافة Middleware رفع صورة الكورس
  courseController.createCourse
);

// ✅ تعديل كورس (للـ Instructors فقط) مع رفع صورة جديدة
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['instructor']),
  upload.single('courseImage'), // إضافة Middleware رفع صورة جديدة
  courseController.updateCourse
);

// ✅ حذف كورس (للـ Instructors فقط)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['instructor']),
  courseController.deleteCourse
);

module.exports = router;
