const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // التحقق من صلاحيات المستخدم
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: '❌ Access Denied: مش مسموح ليك تعمل العملية دي!' });
    }
    next();
  };
};

module.exports = roleMiddleware;