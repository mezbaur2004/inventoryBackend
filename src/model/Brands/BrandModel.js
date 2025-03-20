const mongoose = require("mongoose");

const DataSchema=mongoose.Schema({
    UserEmail:{type:String},
    Name:{type:String,unique:true},
    CreatedDate:{type:Date,Default:Date.now},
},{versionKey:false});
const BrandsModel=mongoose.model('brands',DataSchema);
module.exports = BrandsModel;