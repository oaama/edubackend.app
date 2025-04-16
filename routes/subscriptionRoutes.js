const express = require('express');
const router = express.Router();
const { subscribe, getUserSubscriptions } = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ إضافة اشتراك جديد
router.post('/subscribe', authMiddleware, subscribe);

// ✅ جلب الاشتراكات الخاصة بمستخدم معين
router.get('/user/:userId', authMiddleware, getUserSubscriptions);

module.exports = router;