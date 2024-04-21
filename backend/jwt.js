const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  const token = req.headers.authorization.split(' ')[1]
  if(!token){
    res.status(401).json({
      message:"Unauthorized"
    })
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

const generateToken=(user)=>{
  return jwt.sign({user},process.env.JWT_SECRET,{expiresIn:30000})
}

module.exports = {jwtAuthMiddleware,generateToken};
