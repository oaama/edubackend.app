const multer = require('multer');
const path = require('path');
const fs = require('fs');

// إنشاء المجلد إذا لم يكن موجودًا
const ensureFolderExists = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

// إعداد مكان تخزين الملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // تحديد مكان التخزين بناءً على نوع الملف
    let folder;
    if (file.mimetype.startsWith('video')) {
      folder = 'uploads/videos'; // مسار تخزين الفيديوهات
    } else if (file.mimetype === 'application/pdf') {
      folder = 'uploads/pdfs'; // مسار تخزين ملفات PDF
    } else if (file.mimetype.startsWith('image')) {
      folder = 'uploads/images'; // مسار تخزين الصور
    } else {
      return cb(new Error('❌ نوع الملف غير مدعوم!'), false);
    }

    ensureFolderExists(folder); // إنشاء المجلد إذا لم يكن موجودًا
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
  const allowedTypes = [
    'video/mp4',
    'video/3gpp',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        `❌ نوع الملف "${file.mimetype}" غير مدعوم! فقط ملفات MP4, 3GP, PDF, و الصور (JPEG, PNG, JPG) مسموح بها.`
      ),
      false
    );
  }
  cb(null, true);
};

// إعداد Multer بدون حد لحجم الملفات
const upload = multer({
  storage,
  fileFilter,
  // تمت إزالة الحد الأقصى لحجم الملفات
});

module.exports = upload;