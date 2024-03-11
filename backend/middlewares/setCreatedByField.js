const authUtils = require('../utils/authUtils'); 

const setCreatedByField = async (req, res, next) => {
  try {
    // Check if it's a POST request
    if (req.method === 'POST') {
      const authorizationHeader = req.headers.authorization;

      // Use authUtils.verifyToken to decode the token
      const decoded = authUtils.verifyToken(authorizationHeader);

      // Check if the token is valid
      if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Attach the decoded user information to the request object
      req.user = decoded;

      // Set the createdBy field in the request body
      req.body.createdBy = decoded.id;
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = setCreatedByField;
