const errorMiddleware = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  res.status(err.statusCode || 500).json({
    message: err.message || '❌ حصلت مشكلة في السيرفر!',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // عرض الـ Stack فقط في بيئة التطوير
  });
};

module.exports = errorMiddleware;