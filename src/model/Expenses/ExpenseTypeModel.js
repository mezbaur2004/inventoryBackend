const mongoose=require('mongoose');

const DataSchema=mongoose.Schema({
    UserEmail:{type:String},
    Name:{type:String, unique:true},
    CreateDate:{type:Date,default:Date.now}
},{versionKey:false})
const ExpenseTypesModel=mongoose.model('expensetypes',DataSchema);
module.exports = ExpenseTypesModel;
