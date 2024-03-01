
const express = require('express');
const router = express.Router();
const authUtils = require('../utils/authUtils');
const User = require('../models/UserSchema'); 
const Customer = require('../models/CustomerSchema'); 

router.post('/', async (req, res) => {
  const { email, password, userType } = req.body;

  let userModel;
  if (userType === 'customer') {
    userModel = Customer;
  } else if (userType === 'user') {
    userModel = User;
  } else {
    return res.status(400).json({ error: 'Invalid userType' });
  }

 
    const existingUser =  await userModel.findOne({email})
    
    if(!existingUser){
      return  res.status(404).json({ error: 'user not found' });
    }
 

  const token = await authUtils.login(userModel, email, password);

  if (token) {
    const decodedToken = authUtils.verifyToken(token);
    res.json({ token, userId: decodedToken.id, userRole: decodedToken.role });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
