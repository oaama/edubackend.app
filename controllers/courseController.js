const Course = require('../models/Course');

// ✅ جلب كل الكورسات
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    console.error("❌ Error fetching courses:", err);
    res.status(500).json({ error: '❌ حدث خطأ أثناء جلب الكورسات' });
  }
};

// ✅ جلب كورس معين بالـ ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: '❌ الكورس غير موجود' });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error("❌ Error fetching course by ID:", err);
    res.status(500).json({ error: '❌ حدث خطأ أثناء جلب الكورس' });
  }
};

// ✅ إنشاء كورس جديد مع رفع صورة وفيديوهات
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({ error: '❌ يرجى ملء جميع الحقول المطلوبة: title, description, price, category' });
    }

    // التحقق من رفع صورة الكورس
    const courseImage = req.files['courseImage'] ? req.files['courseImage'][0].path : null;

    // التحقق من رفع الفيديوهات
    const videos = req.files['videos'] ? req.files['videos'].map(file => file.path) : [];

    // إنشاء الكورس
    const course = new Course({
      title,
      description,
      price,
      category,
      courseImage,
      videos,
    });

    await course.save();
    res.status(201).json({ message: '✅ تم إنشاء الكورس بنجاح!', course });
  } catch (err) {
    console.error("❌ Error creating course:", err);
    res.status(500).json({ error: `❌ حدث خطأ أثناء إنشاء الكورس: ${err.message}` });
  }
};

// ✅ تعديل كورس
exports.updateCourse = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({ error: '❌ يرجى ملء جميع الحقول المطلوبة: title, description, price, category' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: '❌ الكورس غير موجود' });
    }

    const updates = { ...req.body };
    if (req.files['courseImage']) {
      updates.courseImage = req.files['courseImage'][0].path;
    }
    if (req.files['videos']) {
      updates.videos = req.files['videos'].map(file => file.path);
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    res.status(200).json({ message: '✅ تم تعديل الكورس بنجاح!', updatedCourse });
  } catch (err) {
    console.error("❌ Error updating course:", err);
    res.status(500).json({ error: `❌ حدث خطأ أثناء تعديل الكورس: ${err.message}` });
  }
};

// ✅ حذف كورس
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: '❌ الكورس غير موجود' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: '✅ تم حذف الكورس بنجاح' });
  } catch (err) {
    console.error("❌ Error deleting course:", err);
    res.status(500).json({ error: `❌ حدث خطأ أثناء حذف الكورس: ${err.message}` });
  }
};