const DataModel=require('../../model/Products/ProductsModel');
const CreateService=require('../../service/common/CreateService');
const UpdateService=require('../../service/common/UpdateService');
const ListTwoJoinService = require("../../service/common/ListTwoJoinService");
const CheckAssociateService=require('../../service/common/CheckAssociateService');
const ReturnProductsModel=require('../../model/Returns/ReturnsProductsModel');
const PurchaseProductsModel=require('../../model/Purchases/PurchaseProductsModel');
const SaleProductsModel=require('../../model/Sales/SalesProductsModel');
const DetailsByIDService=require('../../service/common/DetailsByIDService');
const DropDownService=require('../../service/common/DropDownService');

const mongoose=require('mongoose');
const DeleteService=require('../../service/common/DeleteService');

exports.CreateProducts=async (req,res)=>{
    let Result=await CreateService(req,DataModel);
    res.status(200).json(Result);
}

exports.UpdateProducts=async (req,res)=>{
    let Result=await UpdateService(req,DataModel);
    res.status(200).json(Result);
}
exports.ProductList=async (req,res)=>{
    let SearchRgx={"$regex":req.params.searchKeyword,"$options":"i"};
    let SearchArray=[{Name:SearchRgx},{Unit:SearchRgx},{Details:SearchRgx},{'brands.Name':SearchRgx}];
    let JoinStage1={$lookup:{from:"brands",localField:"BrandID",foreignField:"_id",as:"Brand"}};
    let JoinStage2={$lookup:{from:"categories",localField:"CategoryID",foreignField:"_id",as:"Category"}};
    let Result=await ListTwoJoinService(req,DataModel,SearchArray,JoinStage1,JoinStage2);
    res.status(200).json(Result);
}
exports.DeleteProduct=async (req, res) => {
    let DeleteID=req.params.id;
    const ObjectID = mongoose.Types.ObjectId;

    let CheckReturnAssociate= await CheckAssociateService({ProductID:new ObjectID(DeleteID)},ReturnProductsModel);
    let CheckPurchaseAssociate= await CheckAssociateService({ProductID:new ObjectID(DeleteID)},PurchaseProductsModel);
    let CheckSaleAssociate= await CheckAssociateService({ProductID:new ObjectID(DeleteID)},SaleProductsModel);

    if(CheckReturnAssociate){
        res.status(200).json({status: "associate", data: "Associate with Return"})
    }
    else if(CheckPurchaseAssociate){
        res.status(200).json({status: "associate", data: "Associate with Purchase"})
    }
    else if(CheckSaleAssociate){
        res.status(200).json({status: "associate", data: "Associate with Sale"})
    }
    else{
        let Result=await DeleteService(req,DataModel);
        res.status(200).json(Result)
    }
}

exports.ProductDetailsByID=async (req,res)=>{
    let Result=await DetailsByIDService(req,DataModel);
    res.status(200).json(Result);
}

exports.ProductDropDown=async (req,res)=>{
    let Result=await DropDownService(req,DataModel,{_id:1,Name:1});
    res.status(200).json(Result);
}