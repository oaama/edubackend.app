const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ✅ جلب كل المستخدمين
router.get('/', userController.getAllUsers);

// ✅ تحديث بيانات مستخدم
router.put('/:id', userController.updateUser);

// ✅ حذف مستخدم
router.delete('/:id', userController.deleteUser);

module.exports = router;