const multer = require('multer');
const path = require('path');

// إعداد مكان تخزين الملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.mimetype.startsWith('video') ? 'uploads/videos' : 'uploads/pdfs';
    cb(null, folder); // تحديد مكان التخزين بناءً على نوع الملف
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // اسم الملف هيبقى فريد
  },
});

// فلترة الملفات المسموح برفعها
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('❌ نوع الملف مش مدعوم!'), false);
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