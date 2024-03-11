const express = require('express');
const router = express.Router();
const Customer = require('../models/CustomerSchema'); 
const errorHandler = require('../utils/errorHandler');
const Quotation = require('../models/QuotationSchema')

// Create a new customer
router.post('/', async (req, res) => {
  try {

    const { email } = req.body;
    const existingCustomer = await Customer.findOne({ email }); 
    if (existingCustomer) {
        return res.status(409).json({ error: 'Email already registered' });
      }
  
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    errorHandler(res, error);
  }
});

// Get all projectNames
// router.get('/', async (req, res) => {
//   try {
//     const customers = await Customer.find();
//     res.json(customers);
//   } catch (error) {
//     errorHandler(res, error);
//   }
// });

router.get('/', async (req, res) => {
  console.log(req.headers)
  console.log(req.user)
    try {
      const projectNames = await Customer.find({ isCompleted: false }).select('projectName');
  
      if (!projectNames || projectNames.length === 0) {
        res.status(404).json({ error: 'No projects found' });
        return;
      }
      res.json(projectNames);
    } catch (err) {
        errorHandler(res, error);
    }
  });



// get completed projects

router.get('/completed' ,async (req,res)=>{
    try{
      const completedProjects = await Customer.find({isCompleted:true})
    
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


  // get project dash board 

  router.get('/info', async (req, res) => {
    try {
      const projects = await Customer.find({ isCompleted: false });
  
      if (!projects || projects.length === 0) {
        res.status(404).json({ error: 'No ongoing projects found' });
        return;
      }
  
      // Fetch quotations for each project
      const projectsWithQuotations = await Promise.all(
        projects.map(async (project) => {
          const quotations = await Quotation.find({ projectId: project._id });
          // const totalValue = quotations.reduce((sum, quotation) => sum + (quotation.totalValue || 0), 0);
  
          return {
            ...project.toObject(),
            quotations,
          };
        })
      );
  
      res.json(projectsWithQuotations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve project information' });
    }
  });

  


// Get customer by ID
router.get('/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    errorHandler(res, error);
  }
});

// Update customer by ID
router.patch('/:id', async (req, res) => {
  const customerId = req.params.id;
console.log(req.body)
console.log(customerId)
  try {
    const customer = await Customer.findByIdAndUpdate(customerId, req.body.data, {
      new: true,
    });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json("updated Project Details");
  } catch (error) {
    errorHandler(res, error);
  }
});

// Delete customer by ID
router.delete('/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await Customer.findByIdAndDelete(customerId);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
