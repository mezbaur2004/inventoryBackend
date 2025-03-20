const DataModel=require('../../model/Expenses/ExpenseTypeModel');
const CreateService=require('../../service/common/CreateService');
const UpdateService=require('../../service/common/UpdateService');
const ListService=require('../../service/common/ListService');
const DropDownService=require('../../service/common/DropDownService');
const DetailsByIDService=require('../../service/common/DetailsByIDService');
const DeleteService = require("../../service/common/DeleteService");

exports.CreateExpenseType=async (req,res)=>{
    let Result=await CreateService(req,DataModel)
    res.status(200).json(Result);
}

exports.UpdateExpenseType=async (req,res)=>{
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result);
}

exports.ExpenseTypeList=async (req,res)=>{
    let SearchRgx={$regex:req.params.searchKeyword,"$options":"i"};
    let SearchArray=[{Name:SearchRgx},{Phone:SearchRgx},{Email:SearchRgx},{Address:SearchRgx}];
    let Result=await ListService(req,DataModel,SearchArray);
    res.status(200).json(Result);
}

exports.ExpenseTypeDropDown=async (req,res)=>{
    let Result=await DropDownService(req,DataModel,{_id:1,Name:1})
    res.status(200).json(Result);
}

exports.ExpenseTypeDetailsByID=async (req,res)=>{
    let Result=await DetailsByIDService(req,DataModel);
    res.status(200).json(Result);
}

exports.DeleteExpenseType=async (req,res)=>{
    let Result=await DeleteService(req,DataModel);
    res.status(200).json(Result);
}