const express = require('express');
const PurchaseOrder = require('../models/PoSchema');
const router = express.Router();
const Customer = require('../models/CustomerSchema');
const setVerifiedByField = require('../middlewares/setVerifiedByField');
const setApprovedByField = require ('../middlewares/setApprovedByField')


// new po

router.post("/", async (req, res) => {
  try {
    // Check if the specified stage already exists
    const existingPo = await PurchaseOrder.findOne({project:req.body.project, stage: req.body.stage.toLowerCase() });

    if (existingPo) {
      // Return an error response if the stage is not unique
      return res.status(400).json({ error: 'Stage Already Exists' });
    }

    const lastPo = await PurchaseOrder.findOne({})
      .sort({ poNumber: -1 })
      .exec();

    let newPoNumber = lastPo ? lastPo.poNumber + 1 : 1;

    const newPoData = {
      ...req.body,
      poNumber: newPoNumber
    
    };

    const newPo = new PurchaseOrder(newPoData);
    await newPo.save();

    // Return the new quotation to the client
    res.status(201).json(newPo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// get pending payment po

router.get('/pendingpayment',async (req,res)=>{
  try{
      const pendingPaymentPos = await PurchaseOrder.find({isPendingPayment:false}).populate('vendor','name')
  res.send(pendingPaymentPos)
  
    }catch(error){
    res.status(500).json({ error: error.message });
  }
})



//get verify po list 

router.get('/verify',async (req,res)=>{
  try{
  const unApprovedPos = await PurchaseOrder.find({isVerified:false}).populate('project','name').select('project poNumber stage isApproved isVerified isRejected')

res.send(unApprovedPos)

  }catch(error){
    res.status(500).json({ error: error.message });
  }
})

//get Approvel Po
router.get('/approvel',async (req,res)=>{
  try{
  const unApprovedPos = await PurchaseOrder.find({isApproved:false,isVerified:true}).populate('project','name').select('project poNumber stage isApproved isVerified isRejected')

res.send(unApprovedPos)

  }catch(error){
    res.status(500).json({ error: error.message });
  }
})



router.patch('/verify/:id',setVerifiedByField,async(req,res)=>{
  try{
    const UpdateApprovel = await PurchaseOrder.findByIdAndUpdate(req.params.id,req.body)
    res.send(UpdateApprovel)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})



router.patch('/approvel/:id',setApprovedByField,async(req,res)=>{
  try{
    console.log(req.body)
    const UpdateApprovel = await PurchaseOrder.findByIdAndUpdate(req.params.id,req.body)
    res.send(UpdateApprovel)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})


//get all po 

router.get('/',async (req,res)=>{
  try{
        const po = await PurchaseOrder.find()

        res.send(po)
  }catch(err){
    res.status(500).json({ error: err.message });
  }
})

  // edit po details 

router.patch("/:id", async (req,res)=>{
  try{
    const {id}=req.params
    const updatePo = await PurchaseOrder.findByIdAndUpdate(id,req.body,req.body, { new: true, runValidators: true })
    if (!updatePo) {
      return res.status(404).send({ error: 'Po not found' });
  }
  res.status(200).send(updatePo);
  }catch(error){
    res.status(400).send({ error: 'Failed to update Po', details: error.message });
  }
})

// get by id
router.get('/:id',async (req,res)=>{
  try{
        const poModel = await PurchaseOrder.findById(req.params.id)
        res.send(poModel)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})


//get by id for model view

router.get('/view/:id',async (req,res)=>{
  try{
const po = await PurchaseOrder.findById(req.params.id).populate('vendor','name address').populate('project','projectName').populate('approvedBy verifiedBy createdBy','name')
res.send(po)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})

 



 
  
  
  

// get po using project wize

router.get('/project/:id', async (req, res) => {
  try {
   
    const PoList = await PurchaseOrder.find({ project: req.params.id });
    res.send(PoList)
   
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});





  router.get("/description/:searchTerm", async (req, res) => {
    try {
        const { searchTerm } = req.params;

        // Use a case-insensitive regex for a partial match on the description
        const purchaseOrders = await PurchaseOrder.find({
            'items.description': { $regex: searchTerm, $options: 'i' },
        });

        const filteredPosArray = purchaseOrders.map(order => {
            const matchingItems = order.items
                .filter(item => item.description.match(new RegExp(searchTerm, 'i')))
                .map(matchingItem => ({
                    _id: order._id,
                    description: matchingItem.description,
                    rate: matchingItem.rate,
                    unit: matchingItem.unit,
                    meterialFor: matchingItem.meterialFor,
                }));

            return matchingItems;
        });

        // Flatten the array to send a single array of objects
        const flattenedArray = [].concat(...filteredPosArray);

        res.status(200).json(flattenedArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  

//delete po using id 

router.delete('/:id', async (req,res)=>{
  try{
        const {id}=req.params
        const deletePo= await PurchaseOrder.findByIdAndDelete(id)

        
          res.send("purchase order deleted successfully");
  }catch(error){
    res.status(500).json({ error: 'Internal server error' });
  }
})
  
  module.exports=router


  
  