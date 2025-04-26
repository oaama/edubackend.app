const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // المستخدم
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // الكورس
  startDate: { type: Date, required: true }, // تاريخ بدء الاشتراك
  endDate: { type: Date, required: true }, // تاريخ انتهاء الاشتراك
  createdAt: { type: Date, default: Date.now }, // تاريخ الإنشاء
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
