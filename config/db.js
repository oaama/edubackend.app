const mongoose = require('mongoose');
require('dotenv').config(); // تحميل متغيرات البيئة من ملف .env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // تقليل وقت الانتظار
            family: 4 // يجبر الاتصال على استخدام IPv4
        });

        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // إيقاف التطبيق عند فشل الاتصال
    }
};

module.exports = connectDB;

