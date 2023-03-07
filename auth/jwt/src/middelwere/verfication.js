const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token,'secret');
      console.log('thisis the result ',decoded)
      if(decoded){
        console.log(decoded.username)
    }
      
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid token' });
    }
  };


module.exports = verifyToken