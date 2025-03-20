const ParentModel=require('../../model/Purchases/PurchasesModel');
const ChildsModel=require('../../model/Purchases/PurchaseProductsModel');
const CreateParentChildService=require("../../service/common/CreateParentChildsService");
const ListOneJoinService=require("../../service/common/ListOneJoinService");
const DeleteParentChildsService=require("../../service/common/DeleteParentChildsService");

exports.CreatePurchases=async (req,res)=>{
    result=await CreateParentChildService(req,ParentModel,ChildsModel,'PurchaseID');
    res.status(200).json(result);
}
exports.PurchaseList=async (req,res)=>{
    let SearchRgx={"$regex":req.params.searchKeyword,"$options":"i"};
    let JoinStage={$lookup:{from:"suppliers",localField:"SupplierID",foreignField:"_id",as:"Supplier"}};
    let SearchArray=[{Note: SearchRgx},{'Supplier.Name': SearchRgx},{'Supplier.Address': SearchRgx},{'Supplier.Phone': SearchRgx},{'Supplier.Email': SearchRgx}]
    let Result=await ListOneJoinService(req,ParentModel,SearchArray,JoinStage);
    res.status(200).json(Result);
}

exports.DeletePurchase=async (req,res)=>{
    let Result=await DeleteParentChildsService(req,ParentModel,ChildsModel,['PurchaseID']);
    res.status(200).json(Result);
}
