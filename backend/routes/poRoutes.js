const express = require('express');
const PurchaseOrder = require('../models/PoSchema');
const router = express.Router();
const Customer = require('../models/CustomerSchema')


// new po

router.post("/", async (req, res) => {
  try {
    // Check if the specified stage already exists
    const existingPo = await PurchaseOrder.findOne({projectId:req.body.projectId, stage: req.body.stage.toLowerCase() });

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


  //po verification list
  router.get('/verify', async (req, res) => {
    try {
      // Find Purchase Orders with isVerified set to false
      const unverifiedPos = await PurchaseOrder.find({ isVerified: false }).populate('projectId','projectName').populate('vendorId','vendorName')
  
      if (unverifiedPos.length === 0) {
        // No unverified Purchase Orders found
        return res.status(404).json({ message: 'No Purchase Orders to verify' });
      }
  
      // Process and send the unverified Purchase Orders
      const processedUnverifiedPos = unverifiedPos.map((po) => {
        return {
          projectId:po.projectId,
          siteName: po.projectId.projectName,
          vendorId:po.vendorId,
          poNumber: po.poNumber,
          date: po.date,
          stage: po.stage,
          meterialCatagory: po.meterialCatagory,
          items: po.items,
          subTotal: po.subTotal,
          sgst: po.sgst,
          cgst: po.cgst,
          totalAmount: po.totalAmount,
          _id:po._id
        };
      });
  
      res.json(processedUnverifiedPos);
    } catch (err) {
      console.error('Error retrieving unverified Purchase Orders:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  // po approvel list 
  router.get('/approve', async (req, res) => {
    try {
      const unApprovedPos = await PurchaseOrder.find({ isApproved: false}).populate('projectId','projectName')
  
      if (unApprovedPos.length === 0) {
       
        return res.status(404).json({ message: 'No Purchase Orders to Approve' });
      }
  
      // Process and send the unverified Purchase Orders
      const processedUnApprovedPos = unApprovedPos.map((po) => {
        return {
          siteName: po.projectId.projectName,
          projectId:po.projectId._id, 
          poNumber: po.poNumber,
          date: po.date,
          stage: po.stage,
          meterialCatagory: po.meterialCatagory,
          vendorId: po.vendorId,
          items: po.items,
          subTotal: po.subTotal,
          sgst: po.sgst,
          cgst: po.cgst,
          totalAmount: po.totalAmount,
          _id:po._id
        };
      });
  
      res.json(processedUnApprovedPos);
    } catch (err) {
      console.error('Error retrieving unApproved Purchase Orders:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  // po verification from employee 
  router.patch('/verify/:poId', async (req, res) => {
    try {
      const { poId } = req.params;
      const { userid } = req.headers;
      const updatedPo = await PurchaseOrder.findByIdAndUpdate(
        poId,
        { isVerified: true, verifiedId: userid  },
        { new: true } 
      );
  
      if (updatedPo) {
        res.status(200).json({ message: 'Purchase Order verified successfully', updatedPo });
      } else {
        res.status(404).json({ error: 'Purchase Order not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
 
  
    // po  approvel from admin
  
    router.patch('/approve/:poId', async (req, res) => {
      try {
        const { poId } = req.params;
        const { userid } = req.headers;
        console.log(userid)
    
      
        const updatedPo = await PurchaseOrder.findByIdAndUpdate(
          poId,
          { isApproved: true, approvedId: userid ,verifiedId:userid,isVerified:true},
          { new: true } 
        );
    
        if (updatedPo) {
          res.status(200).json({ message: 'Purchase Order approved successfully', updatedPo });
        } else {
          res.status(404).json({ error: 'Purchase Order not found' });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

// get po using project wize

router.get('/project/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the projectname for the specified projectid
    const project = await Customer.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'No project found for the specified projectid' });
    }

    // Find all  documents with the specified projectid, select only id and date
    const pos = await PurchaseOrder.find({"projectId":projectId}).select('_id date poNumber stage isVerified isApproved totalAmount' );

    if (!pos || pos.length === 0) {
      return res.status(404).json({ error: 'No PO found for the specified projectid' });
    }
    const reversedPos = pos.reverse();
    // Return the project name and PO details (id and date)
    // res.status(200).json({
    //   siteName: project.projectName,
    //   pos: reversedPos.map((po) => ({
    //    _id:po._id,
    //     date: po.date,
    //     poNumber:po.poNumber,
    //     stage:po.stage,
    //     isVerified:po.isVerified,
    //     isApproved:po.isApproved
    //   })),
    // });
    res.status(200).json(reversedPos)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



  //get po by id 
  router.get('/:id', async (req, res) => {
    try {
      const po = await PurchaseOrder
        .findById(req.params.id)
        .populate('projectId', 'projectName')
        .populate('approvedId', 'name') 
        .populate('verifiedId', 'name') 
        .populate('vendorId' , 'shopName')
        .lean(); 
      if (po) {
        const flattenedPo = {
          siteName: po.projectId.projectName,
          poNumber: po.poNumber,
          poDate: po.date,
          stage: po.stage,
          meterialCatagory: po.meterialCatagory,
          supplier: po.vendorId.shopName,
          items: po.items,
          subTotal: po.subTotal,
          sgst: po.sgst,
          cgst: po.cgst,
          totalAmount: po.totalAmount,
          isVerified:po.isVerified,
          isApproved: po.isApproved,
          approvedBy: po.approvedId ? po.approvedId.adminName : 'Not to get name', 
          verifiedBy: po.verifiedId ? po.verifiedId.empName : 'Not Verified', 
        };
  
        res.json(flattenedPo);
      } else {
        res.status(404).json({ error: 'Purchase Order not found' });
      }
    } catch (err) {
      console.error('Error retrieving Purchase Order:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  // get po descrption using query
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

        if(!deletePo){
          return
          res.status(404).json({ error: 'Purchase order not found' });
        }
          res.send("purchase order deleted successfully");
  }catch(error){
    res.status(500).json({ error: 'Internal server error' });
  }
})
  
  module.exports=router


  
  