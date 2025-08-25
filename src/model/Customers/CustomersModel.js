const mongoose=require('mongoose');

const DataSchema=mongoose.Schema({
    UserEmail:{type:String},
    Name:{type:String},
    Phone:{type:String,required:true,unique:true},
    Email:{type:String},
    Address:{type:String},
    CreateDate:{type:Date, default:Date.now}
},{versionKey:false});

const CustomersModel=mongoose.model('customers',DataSchema);
module.exports = CustomersModel;