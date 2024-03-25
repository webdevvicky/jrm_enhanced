const express = require('express');
const router = express.Router();
const Voucher = require('../models/VoucherSchema');
const PurchaseOrder = require('../models/PoSchema')
const setVerifiedByField = require('../middlewares/setVerifiedByField')
const setApprovedByField = require('../middlewares/setApprovedByField')

// CREATE - Create a new voucher
router.post('/', async (req, res) => {
    try {
      // Generate a unique voucher number
      const latestVoucher = await Voucher.findOne().sort({ voucherNumber: -1 });
      const lastVoucherNumber = latestVoucher ? latestVoucher.voucherNumber : 0;
      const newVoucherNumber = lastVoucherNumber + 1;

      // Create the new voucher with the generated voucher number
      const voucher = new Voucher({
        ...req.body,
        voucherNumber: newVoucherNumber,
      });
  
      // Save the voucher to the database
      await voucher.save();
      res.status(201).send(voucher);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
// READ - Get all vouchers
router.get('/', async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.send(vouchers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// READ - Get a single voucher by ID
router.get('/:id', async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) {
      return res.status(404).send({ message: 'Voucher not found' });
    }
    res.send(voucher);
  } catch (error) {
    res.status(500).send(error);
  }
});



// UPDATE - Update a voucher by ID
router.patch('/:id', async (req, res) => {
  // const updates = Object.keys(req.body);
  // const allowedUpdates = ['name', 'project', 'voucherNumber', 'date', 'description', 'totalAmount', 'payableAmount', 'paymentMode', 'purchaseOrder', 'isApproved', 'isVerified', 'isRejected'];
  // const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  // if (!isValidOperation) {
  //   return res.status(400).send({ error: 'Invalid updates!' });
  // }
  console.log(req.body)

  try {
    const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!voucher) {
      return res.status(404).send({ message: 'Voucher not found' });
    }
    res.send(voucher);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - Delete a voucher by ID
router.delete('/:id', async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndDelete(req.params.id);
    if (!voucher) {
      return res.status(404).send({ message: 'Voucher not found' });
    }
    res.send({ message: 'Voucher deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});



// get verify List

router.get('/verify/list',async (req,res)=>{
  try{
  const unVerifiedVouchers = await Voucher.find({isVerified:false,isApproved:false}).populate('project','name').select('project voucherNumber date payableAmount isApproved isVerified isRejected type')

  res.status(200).send(unVerifiedVouchers)

  }catch(error){
    res.status(500).json({ error: error.message });
  }
})


router.patch('/verify/list/:id', setVerifiedByField, async(req,res)=>{
  try{
const voucher = await Voucher.findByIdAndUpdate(req.params.id,req.body)
res.status(200).json(voucher)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
} )


router.get('/approve/list',async (req,res)=>{
  try{
  const unVerifiedVouchers = await Voucher.find({isVerified:true,isApproved:false}).populate('project','projectName').select('project voucherNumber date payableAmount isApproved isVerified isRejected type ')

  res.status(200).send(unVerifiedVouchers)

  }catch(error){
    res.status(500).json({ error: error.message });
  }
})




// Assuming this is the route handler for approving the voucher
router.patch('/approve/list/:id',setApprovedByField, async (req, res) => {
  try {
    const voucherId = req.params.id;
    // Find the voucher by ID
    const voucher = await Voucher.findById(voucherId);

    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }

    // Check if the voucher has already been approved
    if (voucher.isApproved) {
      return res.status(400).json({ error: "Voucher has already been approved" });
    }

    // Retrieve the purchase order associated with the voucher
    const purchaseOrder = await PurchaseOrder.findById(voucher.purchaseOrder).populate('vouchers');

    if (!purchaseOrder) {
      return res.status(404).json({ error: "Purchase order not found" });
    }

    // Calculate total payable amount from vouchers
    const totalPayableAmountFromVouchers = purchaseOrder.vouchers.reduce((total, voucher) => {
      return total + (voucher.isApproved ? voucher.payableAmount : 0);
    }, 0);

    // Calculate total payable amount after approving the current voucher
    const updatedTotalPayableAmount = totalPayableAmountFromVouchers + voucher.payableAmount;

    // Check if approving the current voucher would exceed the total amount
    if (updatedTotalPayableAmount > purchaseOrder.totalAmount) {
      return res.status(400).json({ error: "Approving this voucher would exceed the total amount" });
    }

    // Update the voucher status to approved
    voucher.isApproved = true;

    // Save the updated voucher
    await voucher.save();

    // Update the balance amount for the current voucher
    const balanceAmount = purchaseOrder.totalAmount - updatedTotalPayableAmount;
    voucher.balanceAmount = balanceAmount;
    await voucher.save();

    // Push the ID of the approved voucher into the purchase order's vouchers array
    purchaseOrder.vouchers.push(voucher._id);

    // Save the updated purchase order to update the vouchers array in the database
    await purchaseOrder.save();

    // Check if pending payment becomes 0 and update isPendingPayment accordingly
    if (purchaseOrder.totalAmount === updatedTotalPayableAmount) {
      purchaseOrder.isPendingPayment = false;
      await purchaseOrder.save();
    }

    // Respond with the updated purchase order
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/view/:id', async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id).populate('createdBy approvedBy verifiedBy project purchaseOrder', 'name vouchers  projectName');
    if (!voucher) {
      return res.status(404).send({error:"Voucher Not Found"});
    }

    switch (voucher.type){
      case 'purchaseOrder':

      if (!voucher.purchaseOrder) {
        return res.status(404).send("Purchase Order Not Found");
      }
      const purchaseOrderVouchers = await PurchaseOrder.findById(voucher.purchaseOrder._id)
      .populate('vouchers vendor', 'payableAmount balanceAmount date voucherNumber name')
      .select('poNumber vouchers');
      const currentVoucher = {
        ...voucher.toObject(), // Convert to plain JavaScript object to modify properties
        name: purchaseOrderVouchers.vendor.name,
       
      };
      const previousVouchers =purchaseOrderVouchers.vouchers
      res.status(200).json({currentVoucher,previousVouchers});

      break;

      default:

      res.json({currentVoucher:voucher})

      break

    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
