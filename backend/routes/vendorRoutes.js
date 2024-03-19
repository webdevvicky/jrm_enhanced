const express = require('express');
const router = express.Router();
const Vendor = require('../models/VendorSchema'); 


router.post('/', async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get approvel List of Vendors

router.get('/approvel/list',async (req,res)=>{
  try{
    const approvelList = await Vendor.find({isApproved:false})
    res.status(200).json(approvelList)

  }catch(error){
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// GET all vendors

router.get('/', async (req, res) => {
  try {

   
    const vendors = await Vendor.find({isActive:true})
  
    res.status(200).json(vendors);
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
    const vendorsQuery = Vendor.find({ isActive: true,isApproved:true });

    // Apply search filter if search query is provided
    if (searchQuery) {
      vendorsQuery.find({
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { address: { $regex: searchQuery, $options: 'i' } },
          { items: { $regex: searchQuery, $options: 'i' } },
         
        ]
      });
    }
    // Query vendors with pagination
    const vendors = await vendorsQuery
      .select('name address mobileNumber accountDetails rate items')
      .skip(skip)
      .limit(pageSize);

    // Count total number of vendors
    const totalCount = await Vendor.countDocuments({ isActive: true });
    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      vendors: vendors,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET a vendor by ID
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new vendor


// PATCH/UPDATE a vendor by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true ,runValidators:true}
    );
    if (!updatedVendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.status(200).json(updatedVendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a vendor by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.status(200).json(deletedVendor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;