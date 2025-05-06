// استدعاء مكتبة إكسبريس لتشغيل السيرفر
const express = require('express');
// استدعاء مكتبة Mongoose لربط التطبيق مع MongoDB
const mongoose = require('mongoose');
// تحميل متغيرات البيئة من ملف .env
require('dotenv').config();

// استدعاء الملفات الخاصة بالمسارات
const userRoutes = require('./routes/userRoute');
const courseRoutes = require('./routes/courseRoutes');
const videoRoutes = require('./routes/videoRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const playerRoutes = require('./routes/playerRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const materialRoutes = require('./routes/materialRoutes');
const authRoutes = require('./routes/authRoute'); // ✅ استدعاء مسار المصادقة

// استدعاء Middleware لمعالجة الأخطاء
const errorMiddleware = require('./middleware/errorHandler');

// إنشاء التطبيق باستخدام Express
const app = express();

// تمكين استقبال البيانات بصيغة JSON من الطلبات
app.use(express.json());

// ✅ الاتصال بقاعدة البيانات MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // إذا لم يتم الاتصال خلال 5 ثوانٍ، يتم الإنهاء
            family: 4 // يجبر الاتصال على استخدام IPv4 بدلًا من IPv6
        });

        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // إنهاء التطبيق إذا فشل الاتصال
    }
};

// تنفيذ الاتصال بقاعدة البيانات
connectDB();

// ✅ إعداد المسارات
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes); // مسارات الكورسات
app.use('/api/videos', videoRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes); // مسارات الإدارة
app.use('/api/materials', materialRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/auth', authRoutes); // ✅ تم تصحيح المسار

// Middleware لمعالجة الأخطاء
app.use(errorMiddleware);

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

//Eng-Amglous Rezq
// 🕊️ مزمور 27:1 🕊️
// "ٱلرَّبُّ نُورِي وَخَلَاصِي، مِمَّنْ أَخَافُ؟ ٱلرَّبُّ حِصْنُ حَيَاتِي، مِمَّنْ أَرْتَعِبُ؟"
