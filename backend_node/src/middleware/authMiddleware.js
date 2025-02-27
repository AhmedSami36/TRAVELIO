const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.token;

  if (!token) {
      return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
      const decoded = jwt.verify(token,  config.jwtSecret);
      req.user = decoded;

      next();
  } catch (error) {
      return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;