const express = require('express');
const router = express.Router();
const Enquiry = require('../models/EnquirySchema');
const EnquiryQuotation = require('../models/EnquiryQuoteSchema')

// router.post('/', async (req, res) => {
//   try {
//     const enquiryId = req.body.enquiryId;
//     const previousQuotes = await EnquiryQuotation.findOne({ enquiryId }).sort({ rev: -1 }).limit(1);
//     let newRevNumber = 0;

//     if (previousQuotes) {
//       newRevNumber = previousQuotes.rev + 1;
//     } else {
//       const nextFileNumber = await getNextFileNumber();
//       // Assuming Enquiry model has a field named 'fileNumber'
//       const newFileNumber = await Enquiry.findByIdAndUpdate(enquiryId, { fileNumber: nextFileNumber });
//       // If you need to use newFileNumber for something, do it here
//     }

//     const enquiryQuotation = new EnquiryQuotation({
//       ...req.body,
//       rev: newRevNumber,
//     });

//     await enquiryQuotation.save();
    
//     res.status(201).send(enquiryQuotation);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send(error);
//   }
// });
  
  // Read all

  // router.post('/', async (req, res) => {
  //   try {
  //     const { enquiryId } = req.body;
  //     const previousQuotes = await EnquiryQuotation.findOne({ enquiryId }).sort({ rev: -1 }).limit(1);
  //     let newRevNumber = 0;
  
  //     if (previousQuotes) {
  //       newRevNumber = previousQuotes.rev + 1;
  //     } else {
  //       try {
        
  
  //         const previousFileNumber = await Enquiry.findOne({fileNumber}).sort({ rev: -1 }).limit(1);

  //         const nextFileNumber = previousFileNumber ? previousFileNumber+1 :1
  //         const newFileNumber = await Enquiry.findByIdAndUpdate(enquiryId, { fileNumber: nextFileNumber });
          
  //       } catch (fileNumberError) {
  //         console.error('Error updating file number:', fileNumberError);
  //         throw fileNumberError; // Rethrow the error
  //       }
  //     }
  
  //     const enquiryQuotation = new EnquiryQuotation({
  //       ...req.body,
  //       rev: newRevNumber,
  //     });
  
  //     await enquiryQuotation.save();
  
  //     res.status(201).send(enquiryQuotation);
  //   } catch (error) {
  //     console.error('Error in creating quotation:', error);
  //     res.status(400).send(error);
  //   }
  // });
  

  router.post('/', async (req, res) => {
    try {
      const { enquiryId } = req.body;
      const previousQuotes = await EnquiryQuotation.findOne({ enquiryId }).sort({ rev: -1 }).limit(1);
      let newRevNumber = 0;
  
      if (previousQuotes) {
        newRevNumber = previousQuotes.rev + 1;
      } else {
        try {
          // Assuming Enquiry model has a field named 'fileNumber'
          const previousFileNumberEntry = await Enquiry.findOne({}, { fileNumber: 1 }).sort({ fileNumber: -1 }).limit(1);
          const nextFileNumber = previousFileNumberEntry ? (previousFileNumberEntry.fileNumber || 0) + 1 : 1;
  
          await Enquiry.findByIdAndUpdate(enquiryId, { fileNumber: nextFileNumber });
        } catch (fileNumberError) {
          console.error('Error updating file number:', fileNumberError);
          throw fileNumberError; // Rethrow the error
        }
      }
  
      const enquiryQuotation = new EnquiryQuotation({
        ...req.body,
        rev: newRevNumber,
      });
  
      await enquiryQuotation.save();
  
      res.status(201).send(enquiryQuotation);
    } catch (error) {
      console.error('Error in creating quotation:', error);
      res.status(400).send(error);
    }
  });
  


  router.get('/', async (req, res) => {
    try {
      const enquiryQuotations = await EnquiryQuotation.find();
      res.send(enquiryQuotations);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Read one
  router.get('/:id', async (req, res) => {
    try {
      const enquiryQuotation = await EnquiryQuotation.findById(req.params.id).populate('enquiryId')
  
      if (!enquiryQuotation) {
        return res.status(404).send({ error: 'EnquiryQuotation not found' });
      }
  
      res.send(enquiryQuotation);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  
  // Update
  router.patch('/:id', async (req, res) => {
  
    try {

      const edited = !!req.body.items; // Use the double negation to convert to a boolean
      req.body.isRejected = !edited;
      const enquiryQuotation = await EnquiryQuotation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!enquiryQuotation) {
        return res.status(404).send();
      }
      res.send(enquiryQuotation);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Delete
  router.delete('/:id', async (req, res) => {
    try {
      const enquiryQuotation = await EnquiryQuotation.findByIdAndDelete(req.params.id);
      if (!enquiryQuotation) {
        return res.status(404).send();
      }
      res.send("Quoation Deleted Successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/byEnquiryId/:enquiryId', async (req, res) => {
    try {
      const enquiryQuotations = await EnquiryQuotation.find({ enquiryId: req.params.enquiryId });
  
      if (enquiryQuotations.length === 0) {
        return res.status(404).send({ error: 'No EnquiryQuotations found for the specified enquiryId' });
      }
  
      res.send(enquiryQuotations);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  

  
  module.exports = router;