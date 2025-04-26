const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // الكورس المرتبط
  filePath: { type: String, required: true }, // مسار الملف
  fileType: { type: String, required: true }, // نوع الملف (PDF/ZIP)
  uploadedAt: { type: Date, default: Date.now }, // تاريخ الرفع
});

module.exports = mongoose.model('Material', materialSchema);