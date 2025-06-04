const jwt = require('jsonwebtoken');

module.exports = (requiredRole = 'admin') => (req, res, next) => {
  console.log("verifyAdmin middleware called");

  const token = req.cookies?.token; // ✅ Only read from cookies

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (requiredRole && decoded.role !== requiredRole) {
      return res.status(403).json({ msg: 'Access denied: admin only' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
