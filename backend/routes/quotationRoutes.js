const express = require('express');
const router = express.Router();
const Quote = require('../models/QuotationSchema');


router.post('/', async (req, res) => {
  try {
    const { isAdditional, isInterior, projectId } = req.body;

    const firstQuote = await Quote.findOne({ projectId });

    if (!firstQuote) {
      const newQuoteData = {
        ...req.body,
        rev: 0,
        isConstruction: true,
      };
      const newQuote = await Quote.create(newQuoteData);
      return res.send(newQuote);
    } else {
      let lastQuote;
      if (isAdditional) {
        lastQuote = await Quote.findOne({ projectId, isAdditional: true }).sort({ rev: -1 }).exec();
      } else if (isInterior) {
        lastQuote = await Quote.findOne({ projectId, isInterior: true }).sort({ rev: -1 }).exec();
      } else {
        lastQuote = await Quote.findOne({ projectId }).sort({ rev: -1 }).exec();
      }

      let newRevNumber;
      if (lastQuote) {
        // If there is a last quotation, increment its rev number
        newRevNumber = lastQuote.rev + 1;
      } else {
        // If no quotations exist, start from 1
        newRevNumber = 0;
      }

      // Create a new quotation with the generated rev number
      const newQuoteData = {
        ...req.body,
        rev: newRevNumber,
        isRevised: !req.body.isConstruction && !req.body.isAdditional && !req.body.isInterior ? true : false,
      };

      const newQuote = new Quote(newQuoteData);
      await newQuote.save();

      // Return the new quotation to the client
      res.status(201).json(newQuote);
    }
  } catch (error) {
    res.send(error);
  }
});

// get all quotes


router.get("/", async (req, res) => {
  try {
    // Use populate to include details from ProjectInfo
    const quotations = await Quote.find({})
      .populate('projectId', 'projectName clientName email mobile fileNumber')
      .exec();
    res.status(200).json(quotations);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get using project id 

router.get('/project/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Fetch quotes for the specified projectId
    const quotes = await Quote.find({ "projectId": projectId ,isApproved:true})
      .select('_id rev date isAdditional isRevised isInterior isConstruction totalValue')
      if (!quotes || quotes.length === 0) {
        return res.status(404).json({ error: 'No quotes found for the specified project' });
      }
    res.status(200).json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.get('/:id', async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id).populate('projectId', 'projectName name email mobileNumber projectLocation fileNumber');
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// More general route for fetching all quotes needing approval
router.get('/approvel/all', async (req, res) => {
  try {
    const quotations = await Quote.find({ isApproved: false })
      .populate('projectId', 'projectName name _id')
      .exec();
    res.status(200).json(quotations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.patch('/:id' , async (req,res)=>{
  try {

    const updateQuote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    if (!updateQuote) {
        return res.status(404).send({ error: 'Quote not found' });
    }

    res.status(200).send(updateQuote);
} catch (error) {
    res.status(400).send({ error: 'Failed to update Quote', details: error.message });
}
})


router.patch('/approvel/all/:id', async (req, res) => {
  try {
    const _id = req.params.id;

    // Assuming you have a model named YourModel
    const updatedQuoteApprovel = await Quote.findByIdAndUpdate(
      _id,
      { isApproved: true }, // Update isApproved to true
      { new: true } // Return the updated document
    );

    if (!updatedQuoteApprovel) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    res.status(200).json({ message: 'Quote updated successfully', data: updatedQuoteApprovel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




router.delete('/:id', async (req, res) => {
  try {
   
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);

  
    if (!deletedQuote) {
      return res.status(404).json({ error: 'Quote not found' });
    }


    res.send("Quote deleted successfully");
  } catch (error) {
    

    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;