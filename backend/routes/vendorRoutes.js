const express = require('express');
const router = express.Router();
const Vendor = require('../models/VendorSchema'); 

// GET all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find();
    if (vendors.length === 0) {
      return res.status(404).json({ error: 'No vendors found' });
    }
    res.status(200).json(vendors);
  } catch (error) {
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
router.post('/', async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH/UPDATE a vendor by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
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