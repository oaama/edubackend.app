const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // التحقق من وجود المستخدم في الطلب
    if (!req.user) {
      return res.status(401).json({ message: '❌ Unauthorized: يجب تسجيل الدخول أولاً!' });
    }

    // التحقق من صلاحيات المستخدم
    if (!roles.includes(req.user.role)) {
      console.warn(`❌ Access Denied: User with role '${req.user.role}' tried to access this route.`);
      return res.status(403).json({ message: '❌ Access Denied: مش مسموح ليك تعمل العملية دي!' });
    }

    next();
  };
};

module.exports = roleMiddleware;