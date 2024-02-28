const express = require('express');
const router = express.Router();
const Contractor = require('../models/ContractorSchema');

// Create a new contractor
router.post('/', async (req, res) => {
    try {
        const contractor = new Contractor(req.body);
        await contractor.save();
        res.status(201).send(contractor);
    } catch (error) {
        res.status(400).send({ error: 'Failed to create contractor', details: error.message });
    }
});

// Get all contractors
router.get('/', async (req, res) => {
    try {
        const contractors = await Contractor.find();
        
        if (contractors.length === 0) {
            return res.status(404).send({ message: 'No contractors found' });
        }

        res.status(200).send(contractors);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch contractors', details: error.message });
    }
});


// Get a contractor by ID
router.get('/:id', async (req, res) => {
    try {
        const contractor = await Contractor.findById(req.params.id);
        if (!contractor) {
            return res.status(404).send({ error: 'Contractor not found' });
        }
        res.status(200).send(contractor);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch contractor', details: error.message });
    }
});

// Update a contractor by ID
router.patch('/:id', async (req, res) => {
   

    try {
        console.log(req.body)
        const contractor = await Contractor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!contractor) {
            return res.status(404).send({ error: 'Contractor not found' });
        }

        res.status(200).send(contractor);
    } catch (error) {
        res.status(400).send({ error: 'Failed to update contractor', details: error.message });
    }
});

// Delete a contractor by ID
router.delete('/:id', async (req, res) => {
    try {
        const contractor = await Contractor.findByIdAndDelete(req.params.id);

        if (!contractor) {
            return res.status(404).send({ error: 'Contractor not found' });
        }

        res.status(200).send(contractor);
    } catch (error) {
        res.status(400).send({error:'Failed to delete contractor',details:error.message});
    }
})

module.exports = router