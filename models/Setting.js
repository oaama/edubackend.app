const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  siteName: { type: String, required: true }, // اسم الموقع
  contactEmail: { type: String, required: true }, // البريد الإلكتروني للتواصل
  maintenanceMode: { type: Boolean, default: false }, // وضع الصيانة
});

module.exports = mongoose.model('Setting', settingSchema);