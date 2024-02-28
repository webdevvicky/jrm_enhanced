const express = require('express');
const router = express.Router();
const Invoice = require("../models/InvoiceSchema");
const Customer = require("../models/CustomerSchema")


// create new invoice 
router.post("/", async (req, res) => {
  try {

    const {userid}=req.headers
    // Get the next invoice number
    const lastInvoice = await Invoice.find({})
      .sort({ invoiceNumber: -1 })
      .limit(1)
      .exec();

    let newInvoiceNumber;
    if (lastInvoice.length > 0) {
      const lastInvoiceNumber = lastInvoice[0].invoiceNumber;
      console.log('Last invoice number is:', lastInvoiceNumber);
      newInvoiceNumber = lastInvoiceNumber + 1;
    } else {
      // If no invoices exist, start from 1
      newInvoiceNumber = 1;
    }

    // Create a new invoice with the generated invoice number
    const newInvoiceData = {
      ...req.body,
      invoiceNumber: newInvoiceNumber,
      createdId:userid
    };
    const newInvoice = new Invoice(newInvoiceData);
    await newInvoice.save();
   // console.log(newInvoice)
    const InvoiceData = await Invoice.findById(newInvoice._id);
    res.status(201).send(newInvoice);
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.error(err);
  }
});



//get all invoices 

router.get("/", async (req, res) => {
  try {
    const invoicelist = await Invoice.find();
    res.send(invoicelist);
  } catch (err) {
    res.send(err);
  }
});


// Get invoices using id

router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('projectId', 'name projectAddress location pinCode fileNumber') // Assuming 'projectId' is the field in Invoice model that references ProjectInfo model
      .exec();

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.patch('/:id' , async (req,res)=>{
  try {

    const updateInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    if (!updateInvoice) {
        return res.status(404).send({ error: 'Invoice not found' });
    }

    res.status(200).send(updateInvoice);
} catch (error) {
    res.status(400).send({ error: 'Failed to update Invoice', details: error.message });
}
})


// get invoice list with project id 

router.get('/project/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the projectname for the specified projectid
    const project = await Customer.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'No project found for the specified projectid' });
    }

    // Find all  documents with the specified projectid, select only id and date
    const invoices = await Invoice.find({ "projectId":projectId,isApproved:true }).populate('projectId','name').select('_id date invoiceNumber projectId paymentMade' );

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ error: 'No invoice found for the specified projectid' });
    }

    // Return the project name and invoice details (id and date)
    // res.status(200).json({
    //   projectName: project.projectName,
    //   invoices: invoices.map((invoice) => ({
    //    _id:invoice._id,
    //     created: invoice.created,
    //     invoiceNumber:invoice.invoiceNumber
    //   })),
    // });
    res.json(invoices); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/approvel/all', async (req, res) => {
  try {
    const invoices = await Invoice.find({ isApproved: false }).populate('projectId','projectName name ' ).exec()
    res.status(200).json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.patch('/approvel/all/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const {userid}=req.headers

    //get admin id
    console.log(req.headers)


   
    const updatedInvoiceApprovel = await Invoice.findByIdAndUpdate(
      _id,
      { isApproved: true,approvedId:userid }, // Update isApproved to true
      { new: true } // Return the updated document
    );

    if (!updatedInvoiceApprovel) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({ message: 'Invoice updated successfully', data: updatedInvoiceApprovel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
   
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);

  
    if (!deletedInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }


    res.send("Invoice deleted successfully");
  } catch (error) {
    

    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;