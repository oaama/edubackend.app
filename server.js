const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // تحميل متغيرات البيئة من ملف .env
const secretKey = process.env.JWT_SECRET;
const app = express();

// ✅ الاتصال بقاعدة البيانات
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
           // useNewUrlParser: true,
           // useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // تقليل وقت الانتظار
            family: 4 // يجبر الاتصال على استخدام IPv4
        });

        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // إيقاف التطبيق عند فشل الاتصال
    }
};

// استدعاء الاتصال بقاعدة البيانات
connectDB();

// ✅ تشغيل السيرفر
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
//Eng-Amglous Rezq
// 🕊️ مزمور 27:1 🕊️
// "ٱلرَّبُّ نُورِي وَخَلَاصِي، مِمَّنْ أَخَافُ؟ ٱلرَّبُّ حِصْنُ حَيَاتِي، مِمَّنْ أَرْتَعِبُ؟"
