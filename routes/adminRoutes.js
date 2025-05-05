const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Course = require('../models/Course');
const sendEmail = require('../utils/sendEmail'); // استدعاء وظيفة إرسال البريد الإلكتروني
const upload = require('../middleware/uploadMiddleware'); // استدعاء Middleware رفع الملفات

// ✅ عرض كل المستخدمين
router.get('/users', adminController.getAllUsers);

// ✅ تعديل بيانات مستخدم
router.put('/users/:id', adminController.updateUser);

// ✅ حذف مستخدم
router.delete('/users/:id', adminController.deleteUser);

// ✅ تفعيل الكورس للطالب
router.post('/subscriptions/activate', async (req, res) => {
  try {
    const { email, courseId } = req.body;

    // التحقق من وجود المستخدم
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: '❌ المستخدم غير موجود' });
    }

    // التحقق من وجود الكورس
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: '❌ الكورس غير موجود' });
    }

    // التحقق إذا كان الاشتراك موجودًا بالفعل
    const existingSubscription = await Subscription.findOne({ userId: user._id, courseId });
    if (existingSubscription) {
      return res.status(400).json({ msg: '❌ الطالب مشترك بالفعل في هذا الكورس' });
    }

    // إنشاء اشتراك جديد
    const subscription = await Subscription.create({
      userId: user._id,
      courseId: course._id,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // اشتراك لمدة شهر
    });

    // إرسال بريد إلكتروني للطالب
    const subject = 'تم تفعيل الكورس الخاص بك';
    const text = `مرحبًا ${user.name},\n\nتم تفعيل الكورس "${course.title}" بنجاح. يمكنك الآن الوصول إلى محتوى الكورس.\n\nشكرًا لك!`;
    await sendEmail(user.email, subject, text);

    res.status(201).json({ msg: '✅ تم تفعيل الكورس بنجاح وتم إرسال بريد إلكتروني للطالب', subscription });
  } catch (err) {
    console.error('❌ Error activating subscription:', err);
    res.status(500).json({ msg: '❌ حصلت مشكلة أثناء تفعيل الكورس', error: err.message });
  }
});

// ✅ رفع الملفات (صور أو فيديوهات)
router.post(
  '/upload',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 }, // صورة مصغرة
    { name: 'video', maxCount: 1 }, // فيديو
  ]),
  adminController.uploadFile
);

module.exports = router;