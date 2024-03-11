const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');


// Create a new user
router.post('/', async (req, res) => {
    try {

      const {email}=req.body

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
      }

      const user = new User(req.body);
      await user.save();

      res.status(201).json(user);
    } catch (error) {
      errorHandler(res, error);
    }
  });


  // Get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find().select('name role designation')
  
      if (!users || users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
      }
  
      res.json(users);
    } catch (error) {
      errorHandler(res, error);
    }
  });
  

// Get user by ID
router.get('/:id', async (req, res) => {
 
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      errorHandler(res, error);
    }
  });
  

  // Update user by ID
router.patch('/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      errorHandler(res, error);
    }
  });
// router.patch('/:id', async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const { password, ...updatedFields } = req.body;

//     // Check if password is provided and has a length greater than 0
//     if (password && password.length > 0) {
//       const saltRounds = 10;
//       updatedFields.password = bcrypt.hashSync(password, saltRounds);
//     }

//     // Update other fields if needed
//     const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
//       new: true,
//       runValidators: true,
//     });

//     res.json(updatedUser);
//   } catch (error) {
//     errorHandler(res, error);
//   }
// });

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      errorHandler(res, error);
    }
  });

  module.exports = router;