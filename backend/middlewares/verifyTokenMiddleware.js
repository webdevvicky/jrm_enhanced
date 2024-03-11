const jwt = require('jsonwebtoken');
const authUtils = require('../utils/authUtils')


const verifyTokenMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  // Check if the authorization header is present and starts with 'Bearer '
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify the token using the enhanced verifyToken function
  const decoded = authUtils.verifyToken(authorizationHeader);

  // Check if the token is valid
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Attach the decoded user information to the request object
  req.user = decoded;

  // Proceed to the next middleware or route handler
  next();
};

module.exports = { verifyTokenMiddleware };
