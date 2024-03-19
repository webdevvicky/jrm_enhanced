const express = require('express');
const router = express.Router();
const Contractor = require('../models/ContractorSchema'); 


router.post('/', async (req, res) => {
  try {
    const newContractor = new Contractor(req.body);
    const savedContractor = await newContractor.save();
    res.status(201).json(savedContractor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get approvel List of Contractors

router.get('/approvel/list',async (req,res)=>{
  try{
    const approvelList = await Contractor.find({isApproved:false})
    res.status(200).json(approvelList)

  }catch(error){
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// GET all Contractors

router.get('/', async (req, res) => {
  try {

   
    const contractors = await Contractor.find({isActive:true,isApproved:true})
  
    res.status(200).json(contractors);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get with pagination

router.get('/list', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the requested page number from query parameters, default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of vendors per page
    const skip = (page - 1) * pageSize; // Calculate the number of documents to skip
    const searchQuery = req.query.search || '';


    // Query vendors with pagination and search
    const contractorsQuery = Contractor.find({ isActive: true,isApproved:true });

    // Apply search filter if search query is provided
    if (searchQuery) {
        contractorsQuery.find({
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { category: { $regex: searchQuery, $options: 'i' } },
         
         
        ]
      });
    }
    // Query vendors with pagination
    const Contractors = await contractorsQuery
      .select('name category mobileNumber accountDetails rate ')
      .skip(skip)
      .limit(pageSize);

    // Count total number of vendors
    const totalCount = await Contractor.countDocuments({ isActive: true });
    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      contractors: Contractors,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (error) {
    console.error('Error fetching Contractors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET a contractor by ID
router.get('/:id', async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.id);
    if (!contractor) {
      return res.status(404).json({ error: 'contractor not found' });
    }
    res.status(200).json(contractor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// PATCH/UPDATE a contractor by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedContractor = await Contractor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true ,runValidators:true}
    );
    if (!updatedContractor) {
      return res.status(404).json({ error: 'Contractor not found' });
    }
    res.status(200).json(updatedContractor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE aContractor by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedContractor = await Contractor.findByIdAndDelete(req.params.id);
    if (!deletedContractor) {
      return res.status(404).json({ error: 'Contractor not found' });
    }
    res.status(200).json(deletedContractor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;