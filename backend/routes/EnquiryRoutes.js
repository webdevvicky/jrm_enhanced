const express = require('express');
const router = express.Router();
const Enquiry = require('../models/EnquirySchema');
const errorHandler = require('../utils/errorHandler')

// Create a new enquiry
router.post('/', async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    res.status(201).json(newEnquiry);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Get all enquiries
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ priority: { $ne: 5 } }); // Exclude priority 5
   if(!enquiries){
    return res.send("No Enquiries Found")
   }
    const reversedEnquiry = enquiries.reverse();
    res.json(reversedEnquiry);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


// get moved to booking enquiries 

router.get('/booking',async (req,res)=>{

try{

  const movedBokking = await Enquiry.find({movedToBook:true,isBooked:false}).select('name location fileNumber mobileNumber email')
  if(!movedBokking || movedBokking.length <=0){
    res.status(404).send("No Booking Found")
  }

  res.status(200).send(movedBokking)

}catch(error){
  errorHandler(res,error)
}
})


// Get enquiry by ID
router.get('/:id', async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Update an enquiry by ID
router.patch('/:id', async (req, res) => {
  try {
    console.log(req.body)
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedEnquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.status(200).json(updatedEnquiry);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update Enquiry', error: error.message });
  }
});


// New route for updating remarks
router.patch('/remarks/new/:id', async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const newRemark = req.body.comment;

    // Fetch the existing enquiry
    const existingEnquiry = await Enquiry.findById(enquiryId);

    if (!existingEnquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    // Merge the new remark with the existing remarks
    existingEnquiry.remarks.push({ comment: newRemark });

    // Save the updated enquiry
    const updatedEnquiry = await existingEnquiry.save();

    res.status(200).json(updatedEnquiry);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update remarks', error: error.message });
  }
});

// Delete an enquiry by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedEnquiry = await Enquiry.findByIdAndDelete(req.params.id);
//     if (!deletedEnquiry) {
//       return res.status(404).json({ error: 'Enquiry not found' });
//     }
//     res.json({ message: 'Enquiry deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });





module.exports = router;
