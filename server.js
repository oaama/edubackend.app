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

// إنشاء الأبليكيشن نفسه من express
const app = express();

// نحتاج ده علشان نقدر نستقبل داتا بصيغة JSON من البوست ريكوست
app.use(express.json());

// ✅ الاتصال بقاعدة البيانات MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // دول كانوا مستخدمين في إصدارات قديمة، مش محتاجينهم دلوقتي
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
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
// مثال:
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/notifications', notificationRoutes);

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
