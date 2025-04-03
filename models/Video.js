const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    order: { type: Number, required: true }, // ترتيب الفيديو داخل الكورس
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
