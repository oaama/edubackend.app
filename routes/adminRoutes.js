const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// ✅ عرض كل المستخدمين
router.get('/users', adminController.getAllUsers);

// ✅ تعديل بيانات مستخدم
router.put('/users/:id', adminController.updateUser);

// ✅ حذف مستخدم
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;