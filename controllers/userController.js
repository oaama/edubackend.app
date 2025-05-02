// controllers/userController.js

const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// ✅ تسجيل مستخدم جديد
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, profileImage } = req.body;

    // التحقق من البيانات
    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: '❌ كل الحقول مطلوبة' });
    }

    // التحقق إذا كان الإيميل مستخدم مسبقًا
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: '❌ الإيميل مستخدم بالفعل' });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء المستخدم
    const user = await User.create({ name, email, password: hashedPassword, role, profileImage });

    // إنشاء التوكن
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ token, user });
  } catch (err) {
    console.error('❌ Error during registration:', err);
    res.status(500).json({ msg: '❌ حصلت مشكلة أثناء التسجيل', error: err.message });
  }
};

// ✅ رفع صورة الملف الشخصي
exports.uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user.userId; // يفترض أنك تستخدم Middleware لاستخراج userId من التوكن

    if (!req.file) {
      return res.status(400).json({ msg: '❌ يجب رفع صورة' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: req.file.path },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: '❌ المستخدم غير موجود' });
    }

    res.status(200).json({ msg: '✅ تم رفع الصورة بنجاح', user });
  } catch (err) {
    console.error('❌ Error uploading profile image:', err);
    res.status(500).json({ msg: '❌ حصلت مشكلة أثناء رفع الصورة', error: err.message });
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