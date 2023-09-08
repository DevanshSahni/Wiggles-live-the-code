const mongoose = require ("mongoose");

const QrSchema = new mongoose.Schema({
    message:{type:String,required:true},
    contactNumber:{type:Number,required:true},
    alternateNumber:{type:Number,required:true},
    // switchState: { type: Boolean, default: false }  
}) 

const QrModel = mongoose.model("QR-Message",QrSchema) 

module.exports = QrModel;    