const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose')

const Sitephoto = require("../models/SitePhoto")
const Customer = require("../models/CustomerSchema")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images'); // Save uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  },
});



const upload = multer({ storage });




router.post('/', upload.single('siteimg'), async (req, res) => {
  try {
    const { projectid } = req.body;
    const siteimg = `/uploads/images/${req.file.filename}`;// Get the filename of the uploaded image

    // Create a new service document using the Services model
    const newSitephoto = new Sitephoto({
      projectid,
      siteimg,
    });

    // Save the new service document to the database
    await newSitephoto.save();

    res.status(201).json(newSitephoto); // Respond with the created service
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create service' });
  }
})



router.get('/', async (req, res) => {
  try {
    // Fetch all SitePhoto documents from the database
    const sitePhotos = await Sitephoto.find();

    // Return the array of SitePhoto documents in the response
    res.status(200).json(sitePhotos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// router.get('/:projectid', async (req, res) => {
//   try {
//     const { projectid } = req.params;

//     // Find all SitePhoto documents with the specified projectid
//     const sitePhotos = await Sitephoto.find({ projectid });
//     if (!sitePhotos || sitePhotos.length === 0) {
//       return res.status(404).json({ error: 'No images found for the specified projectid' });
//     }

//     res.status(200).json(sitePhotos);
//   } catch (error) {
//     console.error(error);
    
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Modify the backend route
router.get('/:projectid', async (req, res) => {
  try {
    const { projectid } = req.params;

    // Find the projectname for the specified projectid
    const project = await Customer.findById(projectid);

    if (!project) {
      return res.status(404).json({ error: 'No project found for the specified projectid' });
    }

    // Find all SitePhoto documents with the specified projectid
    const sitePhotos = await Sitephoto.find({ projectid });

    if (!sitePhotos || sitePhotos.length === 0) {
      return res.status(404).json({ error: 'No images found for the specified projectid' });
    }

    // Return the project name and image details
    res.status(200).json({ projectName: project.projectName, sitePhotos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;