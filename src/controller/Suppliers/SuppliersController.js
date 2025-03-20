const DataModel=require('../../model/Suppliers/SuppliersModel');
const CreateService=require('../../service/common/CreateService');
const UpdateService=require('../../service/common/UpdateService');
const ListService=require('../../service/common/ListService');
const DropDownService=require('../../service/common/DropDownService');
const PurchasesModel = require('../../model/Purchases/PurchasesModel');
const mongoose=require('mongoose');
const CheckAssociateService=require('../../service/common/CheckAssociateService');
const DeleteService=require('../../service/common/DeleteService');
const DetailsByIDService=require('../../service/common/DetailsByIDService');

exports.CreateSuppliers=async (req,res)=>{
    let Result=await CreateService(req,DataModel)
    res.status(200).json(Result);
}

exports.UpdateSuppliers=async (req,res)=>{
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result);
}

exports.SupplierList=async (req,res)=>{
    let SearchRgx={$regex:req.params.searchKeyword,"$options":"i"};
    let SearchArray=[{Name:SearchRgx},{Phone:SearchRgx},{Email:SearchRgx},{Address:SearchRgx}];
    let Result=await ListService(req,DataModel,SearchArray);
    res.status(200).json(Result);
}

exports.SupplierDropDown=async (req,res)=>{
    let Result=await DropDownService(req,DataModel,{_id:1,Name:1})
    res.status(200).json(Result);
}

exports.DeleteSupplier=async (req,res)=>{
    let DeleteID=req.params.id;
    const ObjectID=mongoose.Types.ObjectId;
    let CheckAssociate=await CheckAssociateService({SupplierID:new ObjectID(DeleteID)},PurchasesModel)
    if(CheckAssociate){
        res.status(200).json({status:"associated", data:"Associated with Product"});
    }else{
        let Result=await DeleteService(req,DataModel);
        res.status(200).json(Result);
    }
}

exports.SupplierDetailsByID=async (req,res)=>{
    let Result=await DetailsByIDService(req,DataModel)
    res.status(200).json(Result);
}