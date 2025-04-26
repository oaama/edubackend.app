const Material = require('../models/Material');

// ✅ رفع ملف PDF/ZIP
exports.uploadMaterial = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: '❌ يجب رفع ملف' });
    }

    const material = await Material.create({
      courseId,
      filePath: req.file.path,
      fileType: req.file.mimetype,
    });

    res.status(201).json({ message: '✅ تم رفع الملف بنجاح', material });
  } catch (error) {
    console.error('❌ Error uploading material:', error);
    res.status(500).json({ message: '❌ فشل في رفع الملف', error: error.message });
  }
};

// ✅ عرض الملفات المرتبطة بكورس معين
exports.getMaterials = async (req, res) => {
  try {
    const { courseId } = req.params;

    const materials = await Material.find({ courseId });

    if (!materials || materials.length === 0) {
      return res.status(404).json({ message: '❌ لا توجد ملفات لهذا الكورس' });
    }

    res.status(200).json({ message: '✅ تم جلب الملفات بنجاح', materials });
  } catch (error) {
    console.error('❌ Error fetching materials:', error);
    res.status(500).json({ message: '❌ فشل في جلب الملفات', error: error.message });
  }
};