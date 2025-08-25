const CreateService=require('../../service/common/CreateService');
const UpdateService=require('../../service/common/UpdateService');
const ListOneJoinService=require('../../service/common/ListOneJoinService');
const DeleteService=require('../../service/common/DeleteService');
const DetailsByIDService=require('../../service/common/DetailsByIDService');
const DataModel=require('../../model/Expenses/ExpensesModel');

exports.CreateExpenses=async (req,res)=>{
    let Result=await CreateService(req,DataModel);
    res.status(200).json(Result);
}

exports.UpdateExpenses=async (req,res)=>{
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result);
}

exports.ExpenseList=async (req,res)=>{
    let SearchRgx={"$regex":req.params.searchKeyword,"$options":"i"};
    let JoinStage={$lookup:{from:"expensetypes",localField:"TypeID",foreignField:"_id",as:"Type"}}
    let SearchArray=[{Note:SearchRgx},{Amount:SearchRgx},{'Type.Name':SearchRgx}];
    let Result=await ListOneJoinService(req,DataModel,SearchArray,JoinStage);
    res.status(200).json(Result);
}

exports.DeleteExpense=async (req,res)=>{
    let Result=await DeleteService(req,DataModel);
    res.status(200).json(Result);
}

exports.ExpenseDetailsByID=async (req,res)=>{
    let Result=await DetailsByIDService(req,DataModel);
    res.status(200).json(Result);
}