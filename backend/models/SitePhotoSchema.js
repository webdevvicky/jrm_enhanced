const mongoose = require('mongoose');

const SitePhotoSchema = new mongoose.Schema({
    projectid: {  type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectInfo' },
    uploaded: { type: Date, default: Date.now },
    siteimg: { type: String, required: true },
    status:{type:Boolean,default:true},
   
   // uploadedby: { type: mongoose.Schema.Types.ObjectId, ref: 'employeeinfo' },

});

const Sitephoto = mongoose.model('Sitephoto', SitePhotoSchema);

module.exports = Sitephoto;