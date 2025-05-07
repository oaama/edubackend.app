const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'instructor', 'student'], // الأدوار المتاحة
    default: 'student', // الدور الافتراضي هو طالب
  },
  profileImage: { type: String }, // مسار صورة الملف الشخصي
  collegeId: { type: String, required: true }, // مسار صورة الكارنيه (مطلوب)
  activeToken: { type: String }, // تخزين التوكن النشط لمنع تسجيل الدخول من أكثر من جهاز
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
