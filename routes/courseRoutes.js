const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Middleware رفع الملفات

// ✅ جلب الكورسات الخاصة بـ Instructor معين
router.get(
  '/my-courses',
  authMiddleware,
  roleMiddleware(['instructor']),
  courseController.getInstructorCourses
);

// ✅ جلب كورس معين بالـ ID
router.get(
  '/:id',
  authMiddleware,
  courseController.getCourseById
);

// ✅ جلب كل الكورسات
router.get('/', courseController.getAllCourses);

// ✅ إنشاء كورس جديد (للـ Instructors و Admin فقط) مع رفع صورة وفيديوهات
router.post(
  '/create',
  authMiddleware,
  roleMiddleware(['instructor', 'admin']),
  upload.fields([
    { name: 'courseImage', maxCount: 1 }, // رفع صورة الكورس
    { name: 'videos' }, // رفع فيديوهات الكورس بدون حد أقصى
  ]),
  courseController.createCourse
);

// ✅ تعديل كورس خاص بـ Instructor معين مع رفع صورة وفيديوهات جديدة
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['instructor']),
  upload.fields([
    { name: 'courseImage', maxCount: 1 }, // رفع صورة جديدة للكورس
    { name: 'videos' }, // رفع فيديوهات جديدة للكورس بدون حد أقصى
  ]),
  courseController.updateInstructorCourse
);

// ✅ حذف كورس (للـ Instructors فقط)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['instructor']),
  courseController.deleteCourse
);

module.exports = router;
