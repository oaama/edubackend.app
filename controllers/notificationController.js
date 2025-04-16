const Notification = require('../models/Notification');

// ✅ إنشاء نوتيفيكيشن جديد
const createNotification = async (req, res) => {
  try {
    const { userId, title, message } = req.body;

    // التحقق من البيانات
    if (!userId || !title || !message) {
      return res.status(400).json({ message: '❌ كل الحقول مطلوبة!' });
    }

    // إنشاء النوتيفيكيشن
    const notif = await Notification.create(req.body);
    res.status(201).json({ message: '✅ تم إنشاء الإشعار بنجاح!', notif });
  } catch (error) {
    console.error("❌ Error creating notification:", error);
    res.status(400).json({ message: '❌ فشل في إنشاء الإشعار', error: error.message });
  }
};

// ✅ جلب الإشعارات الخاصة بمستخدم معين
const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    // التحقق من وجود معرف المستخدم
    if (!userId) {
      return res.status(400).json({ message: '❌ معرف المستخدم مطلوب!' });
    }

    // جلب الإشعارات من قاعدة البيانات
    const notifs = await Notification.find({ userId });
    res.status(200).json({ message: '✅ تم جلب الإشعارات بنجاح!', notifs });
  } catch (error) {
    console.error("❌ Error fetching user notifications:", error);
    res.status(500).json({ message: '❌ فشل في جلب الإشعارات', error: error.message });
  }
};

module.exports = { createNotification, getUserNotifications };
