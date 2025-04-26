const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const materialController = require('../controllers/materilController');

// ✅ رفع ملف PDF/ZIP
router.post('/:courseId', upload.single('file'), materialController.uploadMaterial);

// ✅ عرض الملفات المرتبطة بكورس معين
router.get('/:courseId', materialController.getMaterials);

module.exports = router;