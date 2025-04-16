const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// ✅ جلب كل الكورسات
router.get('/', courseController.getAllCourses);

// ✅ جلب كورس معين بالـ ID
router.get('/:id', courseController.getCourseById);

// ✅ إنشاء كورس جديد (للـ Instructors فقط)
router.post(
  '/create',
  authMiddleware,
  roleMiddleware(['instructor']),
  courseController.createCourse
);

// ✅ تعديل كورس (للـ Instructors فقط)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['instructor']),
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
