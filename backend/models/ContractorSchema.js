const mongoose = require('mongoose');

const contractorSchema = new mongoose.Schema({
    contractName: {
        type: String,
      
    },
    ownerName: {
        type: String,
       
    },
    contractorMobile: {
        type: Number,
      
    },
    alternateMobile: {
        type: Number
    },
    contractorEmail: {
        type: String,
       
    },
    gpayNumber: {
        type: Number
    },
    accountNumber: {
        type: Number,
       
    },
    ifsc: {
        type: String,
      
    },
    contractorType: {
        type: String,
       
    }
}, {
    timestamps: true // This will add 'createdAt' and 'updatedAt' fields
});

const Contractor = mongoose.model('Contractor', contractorSchema);

module.exports = Contractor;