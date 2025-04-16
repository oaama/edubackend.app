const Subscription = require('../models/Subscription');

// ✅ يضيف اشتراك جديد
const subscribe = async (req, res) => {
  try {
    const { userId, courseId, startDate, endDate } = req.body;

    // التحقق من البيانات
    if (!userId || !courseId || !startDate || !endDate) {
      return res.status(400).json({ message: '❌ كل الحقول مطلوبة!' });
    }

    // إنشاء الاشتراك
    const subscription = await Subscription.create(req.body);
    res.status(201).json({ message: '✅ تم إنشاء الاشتراك بنجاح!', subscription });
  } catch (error) {
    console.error('❌ Error creating subscription:', error);
    res.status(400).json({ message: '❌ فشل في إنشاء الاشتراك', error: error.message });
  }
};

// ✅ يجيب الاشتراكات الخاصة بمستخدم معين
const getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;

    // التحقق من وجود معرف المستخدم
    if (!userId) {
      return res.status(400).json({ message: '❌ معرف المستخدم مطلوب!' });
    }

    // جلب الاشتراكات من قاعدة البيانات
    const subscriptions = await Subscription.find({ userId });
    res.status(200).json({ message: '✅ تم جلب الاشتراكات بنجاح!', subscriptions });
  } catch (error) {
    console.error('❌ Error fetching user subscriptions:', error);
    res.status(500).json({ message: '❌ فشل في جلب الاشتراكات', error: error.message });
  }
};

module.exports = { subscribe, getUserSubscriptions };
