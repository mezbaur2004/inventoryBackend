const ParentModel=require('../../model/Sales/SalesModel');
const ChildsModel=require('../../model/Sales/SalesProductsModel');
const CreateParentChildService=require("../../service/common/CreateParentChildsService");
const ListOneJoinService=require("../../service/common/ListOneJoinService");
const DeleteParentChildsService=require("../../service/common/DeleteParentChildsService");

exports.CreateSales=async (req,res)=>{
    result=await CreateParentChildService(req,ParentModel,ChildsModel,'PurchaseID');
    res.status(200).json(result);
}
exports.SaleList=async (req,res)=>{
    let SearchRgx={"$regex":req.params.searchKeyword,"$options":"i"};
    let JoinStage={$lookup:{from:"customers",localField:"CustomerID",foreignField:"_id",as:"Customer"}};
    let SearchArray=[{Note: SearchRgx},{'Customer.Name': SearchRgx},{'Customer.Address': SearchRgx},{'Customer.Phone': SearchRgx},{'Customer.Email': SearchRgx}]
    let Result=await ListOneJoinService(req,ParentModel,SearchArray,JoinStage);
    res.status(200).json(Result);
}
exports.DeleteSale=async(req,res)=>{
    let Result=await DeleteParentChildsService(req,ParentModel,ChildsModel,'SaleID');
    res.status(200).json(Result);
}
