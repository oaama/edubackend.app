const User = require('../models/User');

// ✅ عرض كل المستخدمين
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ message: '✅ تم جلب المستخدمين بنجاح', users });
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ message: '❌ فشل في جلب المستخدمين', error: error.message });
  }
};

// ✅ تعديل بيانات مستخدم
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: '❌ المستخدم غير موجود' });
    }

    res.status(200).json({ message: '✅ تم تعديل بيانات المستخدم بنجاح', user });
  } catch (error) {
    console.error('❌ Error updating user:', error);
    res.status(500).json({ message: '❌ فشل في تعديل بيانات المستخدم', error: error.message });
  }
};

// ✅ حذف مستخدم
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: '❌ المستخدم غير موجود' });
    }

    res.status(200).json({ message: '✅ تم حذف المستخدم بنجاح' });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    res.status(500).json({ message: '❌ فشل في حذف المستخدم', error: error.message });
  }
};