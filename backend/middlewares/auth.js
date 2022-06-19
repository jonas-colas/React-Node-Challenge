const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.protected = async (req, res, next) => {
  // if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
  let token  
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    }catch(err){
      // throw new Error('Unauthorized access');
      return res.status(401).json({
        error: 'Invalid token'
      });
    }
  }
  if(!token){
    // throw new Error('Unauthorized access, no token provided');
    return res.status(401).json({
      error: 'Unauthorized, no token provided'
    });
  }
}
