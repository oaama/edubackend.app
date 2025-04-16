// controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ✅ إنشاء توكن JWT
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d", // التوكن صالح لمدة 7 أيام
  });
};

// ✅ تسجيل مستخدم جديد
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // التحقق من البيانات
    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "❌ كل الحقول مطلوبة" });
    }

    // التحقق إذا كان الإيميل مستخدم قبل كده
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "❌ الإيميل مستخدم بالفعل" });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء المستخدم
    const user = await User.create({ name, email, password: hashedPassword, role });

    // إنشاء التوكن
    const token = generateToken(user._id, user.role);

    res.status(201).json({ token, user });
  } catch (err) {
    console.error("❌ Error during registration:", err);
    res.status(500).json({ msg: "❌ حصلت مشكلة أثناء التسجيل", error: err.message });
  }
};

// ✅ تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // التحقق من البيانات
    if (!email || !password) {
      return res.status(400).json({ msg: "❌ كل الحقول مطلوبة" });
    }

    // البحث عن المستخدم
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "❌ المستخدم غير موجود" });
    }

    // مقارنة كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "❌ كلمة المرور غير صحيحة" });
    }

    // إنشاء التوكن
    const token = generateToken(user._id, user.role);

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ msg: "❌ حصلت مشكلة أثناء تسجيل الدخول", error: err.message });
  }
};