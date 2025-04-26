const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// ✅ جلب الإعدادات
router.get('/', settingsController.getSettings);

// ✅ تعديل الإعدادات
router.put('/', settingsController.updateSettings);

module.exports = router;