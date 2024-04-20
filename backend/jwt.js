const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; 
    next(); 
  } catch (error) {
    console.error('Error authenticating token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateJWT;
