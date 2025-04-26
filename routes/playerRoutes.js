const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

// ✅ تشغيل الفيديو بجودة معينة
router.get('/video-stream/:videoId', playerController.streamVideo);

// ✅ تحميل الفيديو داخليًا للتطبيق
router.get('/download/:videoId', playerController.downloadVideo);

module.exports = router;