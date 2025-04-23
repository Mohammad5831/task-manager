const jwt = require('jsonwebtoken');

// بررسی توکن JWT
exports.verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'توکن ارائه نشده است' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'توکن نامعتبر است' });
  }
};

// بررسی ادمین بودن
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'دسترسی غیرمجاز.' });
  next();
};