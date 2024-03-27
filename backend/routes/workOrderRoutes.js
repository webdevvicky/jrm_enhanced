const express = require('express');
const WorkOrder = require('../models/WorkOrderSchema');
const router = express.Router();
const setVerifiedByField = require('../middlewares/setVerifiedByField');
const setApprovedByField = require ('../middlewares/setApprovedByField')
const calculateTotalPayableAmount = require('../utils/calculationUtils')


// new WorkOrder

router.post("/", async (req, res) => {
  try {

    const lastWorkOrder = await WorkOrder.findOne({})
      .sort({ woNumber: -1 })
      .exec();

    let newWoNumber = lastWorkOrder ? lastWorkOrder.woNumber + 1 : 1;

    const newWorkOrderData = {
      ...req.body,
      woNumber: newWoNumber
    
    };

    const newWorkOrder = new WorkOrder(newWorkOrderData);
    await newWorkOrder.save();

    // Return the new work order to the client
    res.status(201).json(newWorkOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// get pending payment WorkOrders

router.get('/pendingpayment/project/:id', async (req, res) => {
  try {
    const pendingPaymentWos = await WorkOrder.find({ project: req.params.id, isPendingPayment: true, isApproved: true }).populate('contractor','name')

    // Map each work order to adhere to the PoPendingPaymentProps interface
    const formattedPendingPaymentWos = await Promise.all(pendingPaymentWos.map(async (WorkOrder) => {
      // Calculate total payable amount from vouchers
      const totalPayableAmountFromVouchers = await calculateTotalPayableAmount(WorkOrder.vouchers);

      // Calculate payedAmount and balanceAmount
      const payedAmount = totalPayableAmountFromVouchers;
      const balanceAmount = WorkOrder.totalAmount - totalPayableAmountFromVouchers;

      return {
        woNumber: WorkOrder.woNumber,
        date: WorkOrder.date,
        contractor:WorkOrder.contractor,
        totalAmount: WorkOrder.totalAmount,
        payedAmount: payedAmount,
        balanceAmount: balanceAmount,
        _id: WorkOrder._id
      };
    }));

    res.send(formattedPendingPaymentWos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// for voucher 

router.get('/pendingpayment/:id', async (req, res) => {
  try {
    const WorkOrderId = req.params.id;

    // Find the work order by ID and populate the vendor and vouchers fields
    const workOrder = await WorkOrder.findById(WorkOrderId)
    .populate('vouchers'); // Populate the vouchers array

    if (!workOrder) {
      return res.status(404).json({ error: "Work order not found" });
    }

    // Calculate total payable amount from vouchers
    const totalPayableAmountFromVouchers = workOrder.vouchers.reduce((total, voucher) => {
      return total + voucher.payableAmount;
    }, 0);

    // Calculate balance amount to pay
    const balanceAmountToPay = WorkOrder.totalAmount - totalPayableAmountFromVouchers;

    // Extract relevant details for response
    const response = {
      contractor: workOrder.contractor,
      project:workOrder.project,
      totalAmount: workOrder.totalAmount,
      totalPaidAmount: totalPayableAmountFromVouchers,
      balanceAmountToPay: balanceAmountToPay,
      vouchers: workOrder.vouchers
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




//get verify contractor list 

router.get('/verify',async (req,res)=>{
  try{
  const unApprovedWos = await WorkOrder.find({isVerified:false}).populate('project contractor','name projectName').select('project woNumber  isApproved isVerified isRejected')

res.send(unApprovedWos)

  }catch(error){
    res.status(500).json({ error: error.message });
  }
})



//get Approvel workorder
router.get('/approvel',async (req,res)=>{
  try{
  const unApprovedWos = await WorkOrder.find({isApproved:false,isVerified:true}).populate('project contractor','name projectName').select('project woNumber  isApproved isVerified isRejected')

res.send(unApprovedWos)

  }catch(error){
    res.status(500).json({ error: error.message });
  }
})



router.patch('/verify/:id',setVerifiedByField,async(req,res)=>{
  try{
    const UpdateApprovel = await WorkOrder.findByIdAndUpdate(req.params.id,req.body)
    res.send(UpdateApprovel)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})



// only for approvel 

router.patch('/approvel/:id',setApprovedByField,async(req,res)=>{
  try{
    
    const UpdateApprovel = await WorkOrder.findByIdAndUpdate(req.params.id,req.body)
    res.send(UpdateApprovel)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})


//get all po 

router.get('/',async (req,res)=>{
  try{
        const po = await WorkOrder.find({isApproved:true})

        res.send(po)
  }catch(err){
    res.status(500).json({ error: err.message });
  }
})

  // edit po details 

router.patch("/:id", async (req,res)=>{
  try{
    const {id}=req.params
    req.body.isRejected = false
    
    const updateWo = await WorkOrder.findByIdAndUpdate(id,req.body,req.body, { new: true, runValidators: true })
    if (!updateWo) {
      return res.status(404).send({ error: 'Work Order not found' });
  }
  res.status(200).send(updateWo);
  }catch(error){
    res.status(400).send({ error: 'Failed to update Work Order', details: error.message });
  }
})

// get by id
router.get('/:id',async (req,res)=>{
  try{
        const poModel = await WorkOrder.findById(req.params.id)
        res.send(poModel)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})


//get by id for model view

router.get('/view/:id',async (req,res)=>{
  try{
const workOrder = await WorkOrder.findById(req.params.id).populate('contractor project createdBy approvedBy verifiedBy','name projectName')
res.send(workOrder)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})

 




// get po using project wize

router.get('/project/:id', async (req, res) => {
  try {
   
    const woList = await WorkOrder.find({ project: req.params.id ,isApproved:true,isPendingPayment:false}).populate('contractor','name')
    res.send(woList)
   
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});




//delete Work Order using id 

router.delete('/:id', async (req,res)=>{
  try{
        const {id}=req.params
         await WorkOrder.findByIdAndDelete(id)
          res.send("purchase order deleted successfully");
  }catch(error){
    res.status(500).json({ error: 'Internal server error' });
  }
})
  
  module.exports=router


  
  