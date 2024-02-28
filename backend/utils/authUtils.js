const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  secretKey  = require('./config'); // Replace with your secret key or store it securely

const generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };

  const options = {
    expiresIn: '1d', // You can adjust the expiration time as needed
  };

  return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
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