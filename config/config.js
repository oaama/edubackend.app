require('dotenv').config(); // تحميل متغيرات البيئة من ملف .env

// إعدادات المشروع
const config = {
  mongoURI: process.env.MONGO_URI, // رابط قاعدة البيانات
  jwtSecret: process.env.JWT_SECRET, // المفتاح السري لـ JWT
  roles: {
    admin: 'admin',
    instructor: 'instructor',
    user: 'user',
  },
  uploadPaths: {
    videos: 'uploads/videos', // مسار تخزين الفيديوهات
    pdfs: 'uploads/pdfs', // مسار تخزين ملفات الـ PDF
    images: 'uploads/images', // مسار تخزين الصور
  },
};

module.exports = config;