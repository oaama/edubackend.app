// استدعاء مكتبة إكسبريس لتشغيل السيرفر
const express = require('express');
// استدعاء مكتبة Mongoose علشان نربط مع MongoDB
const mongoose = require('mongoose');
// تحميل متغيرات البيئة من ملف .env
require('dotenv').config();

const userRoutes = require('./routes/userRoute');
const courseRoutes = require('./routes/courseRoutes');
const videoRoutes = require('./routes/videoRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const errorMiddleware = require('./middleware/errorHandler');
const adminRoutes = require('./routes/adminRoutes');
const playerRoutes = require('./routes/playerRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const materialRoutes = require('./routes/materialRoutes');
 // ✅ إضافة استدعاء materialRoutes

// إنشاء الأبليكيشن نفسه من express
const app = express();

// نحتاج ده علشان نقدر نستقبل داتا بصيغة JSON من البوست ريكوست
app.use(express.json());

// ✅ الاتصال بقاعدة البيانات MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // لو السيرفر مأخدش رد خلال 5 ثواني يوقف
            family: 4 // يجبر الاتصال يستخدم IPv4 بدل IPv6
        });

        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // يوقف السيرفر لو حصل خطأ
    }
};

// تنفيذ الفنكشن اللي بتربط بقاعدة البيانات
connectDB();

// ❗️هنا هنضيف بعدين الراوتس
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/materials', materialRoutes); // ✅ تم إضافة المسار
app.use('/api/player', playerRoutes);
app.use('/api/settings', settingsRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

//Eng-Amglous Rezq
// 🕊️ مزمور 27:1 🕊️
// "ٱلرَّبُّ نُورِي وَخَلَاصِي، مِمَّنْ أَخَافُ؟ ٱلرَّبُّ حِصْنُ حَيَاتِي، مِمَّنْ أَرْتَعِبُ؟"
