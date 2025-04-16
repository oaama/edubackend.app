// controllers/userController.js

const User = require("../models/User");

// ✅ جلب كل المستخدمين (للأدمن فقط)
exports.getAllUsers = async (req, res) => {
  try {
    // جلب كل المستخدمين مع استبعاد كلمة المرور
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ msg: "❌ فشل في تحميل المستخدمين", error: err.message });
  }
};

// ✅ تحديث بيانات مستخدم (للأدمن أو المستخدم نفسه)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // التحقق من وجود معرف المستخدم
    if (!id) {
      return res.status(400).json({ msg: "❌ معرف المستخدم مطلوب" });
    }

    // تحديث بيانات المستخدم
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).select("-password");
    if (!updated) {
      return res.status(404).json({ msg: "❌ المستخدم غير موجود" });
    }

    res.status(200).json({ msg: "✅ تم تحديث بيانات المستخدم بنجاح", updated });
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(500).json({ msg: "❌ فشل في تحديث البيانات", error: err.message });
  }
};

// ✅ حذف مستخدم (للأدمن فقط)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // التحقق من وجود معرف المستخدم
    if (!id) {
      return res.status(400).json({ msg: "❌ معرف المستخدم مطلوب" });
    }

    // حذف المستخدم
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ msg: "❌ المستخدم غير موجود" });
    }

    res.status(200).json({ msg: "✅ تم حذف المستخدم بنجاح" });
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ msg: "❌ فشل في الحذف", error: err.message });
  }
};