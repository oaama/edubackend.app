const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // عنوان الفيديو
  videoPath: { type: String, required: true }, // مسار الفيديو
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // الكورس المرتبط
  order: { type: Number, required: true }, // ترتيب الفيديو داخل الكورس
});

module.exports = mongoose.model('Video', videoSchema);
