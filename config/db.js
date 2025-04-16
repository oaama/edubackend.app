const mongoose = require('mongoose');
require('dotenv').config(); // تحميل متغيرات البيئة من ملف .env

// ✅ وظيفة الاتصال بقاعدة البيانات
const connectDB = async () => {
  try {
    // الاتصال بـ MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // استخدام محلل URL الجديد
      useUnifiedTopology: true, // تحسين إدارة الاتصال
      serverSelectionTimeoutMS: 5000, // تقليل وقت الانتظار عند محاولة الاتصال
      family: 4, // يجبر الاتصال على استخدام IPv4
    });

    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // إيقاف التطبيق عند فشل الاتصال
  }
};

module.exports = connectDB;

