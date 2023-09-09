const mongoose = require ("mongoose");

const VaccinationSchema= new mongoose.Schema({
    name:{type:String},
    batchNumber:{type: Number},
    date:{type: Date},
    dueDate:{type:Date},
})

const ProfileSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{ type:String},
    dob:{type:Date},
    breed:{type:String,required:true},
    gender:{type:String,required:true},
    vaccinated:{type:Boolean},
    image:{
        type:String
    },
    bio:{type: String},
    dueDate:{type: Date},
    address: {type: String},
    height: {type: Number},
    weight: {type: Number},
    allergies: {type: String},
    conditions: {type: String},
    vetName: {type: String},
    vetNumber: {type: Number},
    vetAddress: {type: String},
    vaccinations: [{type: VaccinationSchema}]
}) 

const ProfileModel = mongoose.model("profile",ProfileSchema)

module.exports = ProfileModel;   
