const express = require('express');
const router = express.Router();
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
    const { fileName,project } = req.body;
   
    const filePath = `/uploads/designs/${req.file.filename}`;
   
    const design = new Design({ fileName, designFile: filePath,project });
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

// router.get('/:id', async (req, res) => {
//     try {
//       const design = await Design.findById(req.params.id);
//       if (!design) {
//         return res.status(404).send();
//       }
  
//       const filePath = path.join(__dirname, 'uploads', design.file);
  
//       // Check if the file exists
//       if (!fs.existsSync(filePath)) {
//         return res.status(404).send('File not found');
//       }
  
//       // Read the file and send it as a response
//       const fileStream = fs.createReadStream(filePath);
//       fileStream.pipe(res);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send(error.message || 'Internal Server Error');
//     }
//   });


router.get('/:id', async (req,res)=>{
  try{
    const design = await Design.findById(req.params.id)
    if(!design){
    res.status(404).send({error:"No File Found"})
    }
    res.send(design)
  }catch(error){
res.status(500).send({error:"server error"})
  }
})

router.get('/project/:id', async (req,res)=>{
  try{
    const designsList = await Design.find({"project":req.params.id,"isApproved":true}).populate('project')

    if(!designsList){
      return res.send("No files Found")
    }
    res.send(designsList)
  }catch(error){
    res.status(500).send(error.message || 'Internal Server Error');
  }
})


router.get('/approvel/all',async (req,res)=>{
  try{

    const ApprovelList = await Design.find({isApproved:false}).populate('project' ,'projectName')

    res.status(200).send(ApprovelList)


  }catch(error){
    res.status(500).send(error.message || 'Internal Server Error');
  }
})

router.patch('/:id', async (req,res)=>{
  try{
    const updateFile = await Design.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
    if (!updateFile) {
      return res.status(404).send();
    }
    res.send(updateFile);
  
  }catch(error){
    res.status(500).send(error.message || 'Internal Server Error');
  }
})


// DELETE route for deleting a file
router.delete('/:id', async (req, res, next) => {
  try {
    const deleteFile = await Design.findById(req.params.id);
    
    if (!deleteFile) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileName = path.basename(deleteFile.designFile);
    const filePathFinal = path.resolve(__dirname, '..', 'uploads', 'designs', fileName);


    fs.unlink(filePathFinal, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error deleting file' });
      }

      // If the file deletion is successful, delete the document from the database
      try {
        await Design.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'File and document deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting document' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






module.exports = router;
