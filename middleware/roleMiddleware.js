const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // التحقق من وجود المستخدم في الطلب
    if (!req.user) {
      return res.status(401).json({ message: '❌ Unauthorized: يجب تسجيل الدخول أولاً!' });
    }

    // السماح للأدمن بالوصول إلى جميع المسارات
    if (req.user.role === 'admin') {
      return next();
    }

    // التحقق من صلاحيات المستخدم
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: '❌ Access Denied: مش مسموح ليك تعمل العملية دي!' });
    }

    next();
  };
};

module.exports = roleMiddleware;