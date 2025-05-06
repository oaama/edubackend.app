const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin', 'instructor', 'student'],
    default: 'user',
  },
  profileImage: { type: String }, // مسار صورة الملف الشخصي
  collegeId: { type: String, required: true }, // مسار صورة الكارنيه (مطلوب)
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
