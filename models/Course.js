const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    freeVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }], // فيديوهات مجانية للعرض
    category: { type: String, required: true }, // تصنيف الكورس
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
