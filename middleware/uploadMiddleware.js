const multer = require('multer');
const path = require('path');

// إعداد مكان تخزين الملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // تحديد مكان التخزين بناءً على نوع الملف
    const folder = file.mimetype.startsWith('video') ? 'uploads/videos' : 'uploads/pdfs';
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    // إنشاء اسم فريد للملف باستخدام التاريخ واسم الملف الأصلي
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// فلترة الملفات المسموح برفعها
const fileFilter = (req, file, cb) => {
  // أنواع الملفات المسموح بها
  const allowedTypes = ['video/mp4', 'video/3gpp', 'application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('❌ نوع الملف غير مدعوم! فقط ملفات MP4, 3GP, و PDF مسموح بها.'), false);
  }
  cb(null, true);
};

// إعداد Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // الحد الأقصى لحجم الملف: 100 ميجا
});

module.exports = upload;