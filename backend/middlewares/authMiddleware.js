const jwt = require('jsonwebtoken');

function verifyToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
}

module.exports = {
  isAdmin: (req, res, next) => {
    const token = verifyToken(req);
    if (!token) return res.status(401).json({ message: 'Missing token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === 'admin') {
        req.user = decoded;
        return next();
      }
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

  isStaffOrAdmin: (req, res, next) => {
    const token = verifyToken(req);
    if (!token) return res.status(401).json({ message: 'Missing token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === 'admin' || decoded.role === 'staff') {
        req.user = decoded;
        return next();
      }
      return res.status(403).json({ message: 'Forbidden: Admin or Staff only' });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },
};
