const DataModel=require('../../model/Customers/CustomersModel');
const CreateService=require('../../service/common/CreateService');
const UpdateService=require('../../service/common/UpdateService');
const ListService=require('../../service/common/ListService');
const DropDownService=require('../../service/common/DropDownService');
const mongoose = require("mongoose");
const CheckAssociateService = require("../../service/common/CheckAssociateService");
const DeleteService = require("../../service/common/DeleteService");
const SalesModel=require('../../model/Sales/SalesModel');
const DetailsByIDService=require('../../service/common/DetailsByIDService');

exports.CreateCustomers=async (req,res)=>{
    let Result=await CreateService(req,DataModel)
    res.status(200).json(Result);
}

exports.UpdateCustomers=async (req,res)=>{
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result);
}

exports.CustomerList=async (req,res)=>{
    let SearchRgx={$regex:req.params.searchKeyword,"$options":"i"};
    let SearchArray=[{Name:SearchRgx}];
    let Result=await ListService(req,DataModel,SearchArray);
    res.status(200).json(Result);
}

exports.CustomerDropDown=async (req,res)=>{
    let Result=await DropDownService(req,DataModel,{_id:1,Name:1})
    res.status(200).json(Result);
}

exports.DeleteCustomer=async (req,res)=>{
    let DeleteID=req.params.id;
    const ObjectID=mongoose.Types.ObjectId;
    let CheckAssociate=await CheckAssociateService({CustomerID:new ObjectID(DeleteID)},SalesModel)
    if(CheckAssociate){
        res.status(200).json({status:"associated", data:"Associated with Sales"});
    }else{
        let Result=await DeleteService(req,DataModel);
        res.status(200).json(Result);
    }
}

exports.CustomerDetailsByID=async (req,res)=>{
    let Result=await DetailsByIDService(req,DataModel)
    res.status(200).json(Result);
}