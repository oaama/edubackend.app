const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String }, // صورة البروفايل (اختياري)
    role: { type: String, enum: ["user", "admin", "instructor"], default: "user" },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // الكورسات المشتركة
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
