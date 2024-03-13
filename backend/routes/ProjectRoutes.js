const express = require('express');
const router = express.Router();
const Customer = require('../models/CustomerSchema'); 
const Project = require('../models/ProjectSchema')
const errorHandler = require('../utils/errorHandler');
const Enquiry = require('../models/EnquirySchema')
const EnquiryQuotation = require('../models/EnquiryQuoteSchema')
const Quotation = require('../models/QuotationSchema')

// Create a new Project
router.post('/', async (req, res) => {
  try {
    const { projectName,email,fileNumber } = req.body;
    //check email 
    const existingEmail = await Project.findOne({email:email})
    if (existingEmail) {
        return res.status(409).json({ error: 'Email already exists' });
      }
    // Check if a project with the same name already exists
    const existingProject = await Project.findOne({projectName: projectName });
    if (existingProject) {
      return res.status(409).json({ error: 'Project name already exists' });
    }

    const existingFileNumber = await Project.findOne({fileNumber:fileNumber})
    if (existingFileNumber) {
        return res.status(409).json({ error: 'File Number already exists' });
      }
    // Create a new project
    const newProject = await Project.create(req.body);

    // Create a corresponding customer
     const newCustomer = {
      name: newProject.name,
      email: newProject.email,
      mobileNumber: newProject.mobileNumber,
      password:"Admin@123",
      project: newProject._id
       };

    const customer = new Customer(newCustomer);
    await customer.save();

    res.status(201).json({ project: newProject });
  } catch (error) {
    errorHandler(res, error);
  }
});


//get Approvel List 

router.get('/approvel' ,async (req,res)=>{
   
    try{
        const approvelList = await  Project.find({isApproved:false}).select('projectName fileNumber  isApproved isRejected')

    if(!approvelList){
        res.status(404).send({error:"No Project Found For Approvel"})
    }
  
    res.send(approvelList)
    }catch(error){
        errorHandler(res, error);
    }
})


router.get('/', async (req, res) => {
    try {
      const projectNames = await Project.find({ isCompleted: false , status:true,isApproved:true }).select('projectName');
  
      if (!projectNames || projectNames.length === 0) {
        res.status(404).json({ error: 'No projects found' });
        return;
      }
      res.json(projectNames);
    } catch (err) {
        errorHandler(res, err);
    }
  });



// get completed projects

router.get('/completed' ,async (req,res)=>{
    try{
      const completedProjects = await Project.find({isCompleted:true})
    
      if (!completedProjects || completedProjects.length === 0) {
        res.status(404).json({ error: 'No completed projects found' });
        return;
      }
        res.send(completedProjects)
     }catch(err){
      res.status(500).json({ error: 'Failed to retrieve project names' });
     }
    }
  )


  // get project list 

  router.get('/ongoing', async (req, res) => {
    try {
      const projects = await Project.find({ isCompleted: false,status:true ,isApproved:true}).select('projectName fileNumber mobileNumber email ')
  
      if (!projects || projects.length === 0) {
        res.status(404).json({ error: 'No ongoing projects found' });
        return;
      }
      res.json(projects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve project information' });
    }
  });

  
// Get customer by ID
router.get('/:id', async (req, res) => {
  
  try {

    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    errorHandler(res, error);
  }
});


// Update customer by ID
router.patch('/:id', async (req, res) => {
 
  try {
    const {isApproved}=req.body
   
    const projectId = req.params.id;
    const project = await Project.findByIdAndUpdate(projectId,req.body, {
      new: true,
      runValidators:true
    });



    if (!project) {
      return res.status(404).json({ error: 'project not found' });
    }
    
    if(isApproved){
        await Enquiry.findByIdAndUpdate(project.enquiry,{isBooked:true})

     // const lastQuote =   await EnquiryQuotation.findOne(project.enquiry ).sort({ rev: -1 }).limit(1);
        const lastQuote = await EnquiryQuotation.findOne({enquiryId:project.enquiry}).sort({ rev: -1 }).limit(1);

       if(lastQuote){
              const mergeLastQuote = {  
                project:project._id,
                isConstruction:true,
                date:lastQuote.date,
                totalValue:lastQuote.totalValue,
                rev:lastQuote.rev,
                isApproved:true,
                items:lastQuote.items,
                createdBy:lastQuote.createdBy,
              }

           const quote = await Quotation.create(mergeLastQuote)
       }
    }
    res.json(project);

  } catch (error) {
    errorHandler(res, error)
  }
});

// Delete customer by ID
router.delete('/:id', async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findByIdAndDelete(projectId);
    

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    if(project.isApproved === true ){
        return res.status(406).json({error:"Can't delete Approved Project"})
    }

    res.json("project Deleted Successfully");
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
