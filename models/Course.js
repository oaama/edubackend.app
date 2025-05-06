const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  courseImage: { type: String }, // صورة الكورس
  videos: [{ type: String }], // مسارات الفيديوهات المرفوعة
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // المدرس الذي أنشأ الكورس
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
