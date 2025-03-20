const DataModel=require('../../model/Categories/CategoriesModel');
const CreateService=require('../../service/common/CreateService');
const UpdateService=require('../../service/common/UpdateService');
const ListService=require('../../service/common/ListService');
const DropDownService=require('../../service/common/DropDownService');
const CheckAssociateService = require("../../service/common/CheckAssociateService");
const ProductsModel = require("../../model/Products/ProductsModel");
const mongoose=require('mongoose');
const DeleteService = require("../../service/common/DeleteService");
const DetailsByIDService=require('../../service/common/DetailsByIDService');

exports.CreateCategories=async (req,res)=>{
    let Result=await CreateService(req,DataModel)
    res.status(200).json(Result);
}

exports.UpdateCategories=async (req,res)=>{
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result);
}

exports.CategoryList=async (req,res)=>{
    let SearchRgx={$regex:req.params.searchKeyword,"$options":"i"}
    let SearchArray=[{Name:SearchRgx}]
    let Result=await ListService(req,DataModel,SearchArray)
    res.status(200).json(Result);
}

exports.CategoryDropDown=async (req,res)=>{
    let Result=await DropDownService(req,DataModel,{_id:1,Name:1})
    res.status(200).json(Result);
}

exports.DeleteCategory=async (req,res)=>{
    let DeleteID=req.params.id;
    const ObjectID=mongoose.Types.ObjectId;
    let CheckAssociate=await CheckAssociateService({CategoryID:new ObjectID(DeleteID)},ProductsModel)
    if(CheckAssociate){
        res.status(200).json({status:"associated", data:"Associated with Category"});
    }else{
        let Result=await DeleteService(req,DataModel);
        res.status(200).json(Result);
    }
}

exports.CategoryDetailsByID=async (req,res)=>{
    let Result=await DetailsByIDService(req,DataModel)
    res.status(200).json(Result);
}