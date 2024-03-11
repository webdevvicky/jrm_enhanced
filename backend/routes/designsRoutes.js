const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Design = require('../models/DesignSchema')

const uploadFolder = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/designs');
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post('/', upload.single('designFile'), async (req, res) => {
  try {
    const { fileName,projectId } = req.body;
   
    const filePath = `/uploads/designs/${req.file.filename}`;
   
    const design = new Design({ fileName, designFile: filePath,projectId });
    await design.save();

    res.status(201).send(design);
  } catch (error) {
    
    res.status(500).send(error.message || 'Internal Server Error');
  }
});


router.get('/',async (req,res)=>{
    try{
const files = await Design.find()
res.send(files)
    }catch(error){
        res.status(500).send(error.message || 'Internal Server Error');
    }
})

router.get('/:id', async (req, res) => {
    try {
      const design = await Design.findById(req.params.id);
      if (!design) {
        return res.status(404).send();
      }
  
      const filePath = path.join(__dirname, 'uploads', design.file);
  
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
      }
  
      // Read the file and send it as a response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message || 'Internal Server Error');
    }
  });


router.get('/project/:id', async (req,res)=>{
  try{
    const designsList = await Design.find({"projectId":req.params.id})

    if(!designsList){
      return res.send("No files Found")
    }
    res.send(designsList)
  }catch(error){
    res.status(500).send(error.message || 'Internal Server Error');
  }
})

module.exports = router;
