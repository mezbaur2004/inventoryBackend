const mongoose = require("mongoose");
const DataSchema=mongoose.Schema({
    UserEmail:{type:String},
    PurchaseID:{type:mongoose.Schema.Types.ObjectId},
    ProductID:{type:mongoose.Schema.Types.ObjectId},
    Qty:{type:Number},
    UnitCost:{type:Number},
    Total:{type:Number},
    CreatedDate:{type:Date,default:Date.now}
},{versionKey:false});
const PurchasesProductModel=mongoose.model('purhcasesproducts',DataSchema);
module.exports=PurchasesProductModel;