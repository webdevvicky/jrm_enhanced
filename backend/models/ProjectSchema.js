const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    fileNumber: {
        type: Number,
        required: true
    },
    name: String,
    mobileNumber: {
        type: Number,
        required: true
    },
    alternateMobile: Number,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    occupation: String,
    address: String,
    projectLocation: {
        type: String,
        required: true
    },
    enquiry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enquiry',
        required: true
    },
    plotArea: String,
    projectAddress: String,
    floorsNumber: Number,
    buildUpArea: String,
    facing: String,
    roadWidth: String,
    cementBrand: String,
    steelBrand: String,
    brickWork: String,
    plasteringWork: String,
    architect: String,
    projectManager: String,
    siteEngineer: String,
    
    projectValue: Number,
    status: {
        type: Boolean,
        default: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isRejected: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
