const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const generateToken = (user) => {

  const payload = {
    id: user._id,
    role: user.role,
    allowedRoutes:user.allowedRoutes 
  };

  const options = {
    expiresIn: '1d', 
  };

  return jwt.sign(payload, process.env.TOKEN_SECRET, options);
};

const verifyToken = (authorizationHeader) => {
  // Check if the authorization header is present and starts with 'Bearer '
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return null; // Invalid token format
  }

  try {
    // Extract token without 'Bearer' prefix
    const tokenWithoutBearer = authorizationHeader.split(' ')[1];
    
    const decoded = jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET);
    return decoded;
  } catch (error) {
    return null; // Invalid or expired token
  }
};

const login = async (User, email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null; // Invalid credentials
  }

  const token = generateToken(user);
  return token;
};

module.exports = { generateToken, verifyToken, login };