const Video = require('../models/Video');

// ✅ إضافة فيديو جديد مربوط بكورس
const addVideo = async (req, res) => {
  try {
    const { title, courseId } = req.body;

    // التحقق من البيانات
    if (!title || !courseId) {
      return res.status(400).json({ message: '❌ كل الحقول مطلوبة!' });
    }

    // التحقق من رفع الفيديو
    if (!req.file) {
      return res.status(400).json({ message: '❌ لازم ترفع فيديو!' });
    }

    // إنشاء الفيديو
    const video = new Video({
      title,
      videoPath: req.file.path, // مسار الفيديو المرفوع
      courseId,
    });

    await video.save();
    res.status(201).json({ message: '✅ تم إضافة الفيديو بنجاح!', video });
  } catch (error) {
    console.error('❌ Error adding video:', error);
    res.status(400).json({ message: '❌ فشل في إضافة الفيديو', error: error.message });
  }
};

// ✅ جلب الفيديوهات الخاصة بكورس معين
const getVideosByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // التحقق من وجود معرف الكورس
    if (!courseId) {
      return res.status(400).json({ message: '❌ معرف الكورس مطلوب!' });
    }

    // جلب الفيديوهات المرتبطة بالكورس
    const videos = await Video.find({ courseId });
    res.status(200).json({ message: '✅ تم جلب الفيديوهات بنجاح!', videos });
  } catch (error) {
    console.error('❌ Error fetching videos by course:', error);
    res.status(500).json({ message: '❌ فشل في جلب الفيديوهات', error: error.message });
  }
};

module.exports = { addVideo, getVideosByCourse };
