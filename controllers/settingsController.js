const Setting = require('../models/Setting');

// ✅ جلب الإعدادات
exports.getSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne();

    if (!settings) {
      return res.status(404).json({ message: '❌ الإعدادات غير موجودة' });
    }

    res.status(200).json({ message: '✅ تم جلب الإعدادات بنجاح', settings });
  } catch (error) {
    console.error('❌ Error fetching settings:', error);
    res.status(500).json({ message: '❌ فشل في جلب الإعدادات', error: error.message });
  }
};

// ✅ تعديل الإعدادات
exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body;

    const settings = await Setting.findOneAndUpdate({}, updates, { new: true, upsert: true });

    res.status(200).json({ message: '✅ تم تعديل الإعدادات بنجاح', settings });
  } catch (error) {
    console.error('❌ Error updating settings:', error);
    res.status(500).json({ message: '❌ فشل في تعديل الإعدادات', error: error.message });
  }
};