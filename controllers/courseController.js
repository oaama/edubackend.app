const Course = require('../models/Course');

// ✅ جلب كل الكورسات
exports.getAllCourses = async (req, res) => {
  try {
    // جلب كل الكورسات من قاعدة البيانات
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

    // التحقق إذا كان الكورس موجود
    if (!course) {
      return res.status(404).json({ error: '❌ الكورس غير موجود' });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error("❌ Error fetching course by ID:", err);
    res.status(500).json({ error: '❌ حدث خطأ أثناء جلب الكورس' });
  }
};

// ✅ إنشاء كورس جديد
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    // التحقق من البيانات
    if (!title || !description || !price || !category) {
      return res.status(400).json({ error: '❌ كل الحقول مطلوبة' });
    }

    // إنشاء الكورس
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ message: '✅ تم إنشاء الكورس بنجاح!', course });
  } catch (err) {
    console.error("❌ Error creating course:", err);
    res.status(400).json({ error: '❌ فشل في إنشاء الكورس' });
  }
};

// ✅ تعديل كورس
exports.updateCourse = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    // التحقق من البيانات
    if (!title || !description || !price || !category) {
      return res.status(400).json({ error: '❌ كل الحقول مطلوبة' });
    }

    // تعديل بيانات الكورس
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) {
      return res.status(404).json({ error: '❌ الكورس غير موجود' });
    }

    res.status(200).json({ message: '✅ تم تعديل الكورس بنجاح!', course });
  } catch (err) {
    console.error("❌ Error updating course:", err);
    res.status(400).json({ error: '❌ فشل في تعديل الكورس' });
  }
};

// ✅ حذف كورس
exports.deleteCourse = async (req, res) => {
  try {
    // حذف الكورس من قاعدة البيانات
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: '❌ الكورس غير موجود' });
    }

    res.status(200).json({ message: '✅ تم حذف الكورس بنجاح' });
  } catch (err) {
    console.error("❌ Error deleting course:", err);
    res.status(500).json({ error: '❌ فشل في حذف الكورس' });
  }
};