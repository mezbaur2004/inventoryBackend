const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    UserEmail:{type:String},
    TypeID:{type:mongoose.Schema.Types.ObjectId},
    Amount:{type:Number},
    Notes:{type:String},
    CreatedDate:{type:Date,default:Date.now},
},{versionKey:false});
const ExpenseModel=mongoose.model('expenses',DataSchema);
module.exports=ExpenseModel;