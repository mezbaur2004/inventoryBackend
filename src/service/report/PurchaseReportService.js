const PurchaseProductsModel=require("../../model/Purchases/PurchaseProductsModel");
const PurchaseReportService=async (Request)=>{
    try{
        let UserEmail=Request.headers['email'];
        let FromDate=Request.body['FromDate'];
        let ToDate=Request.body['ToDate'];

        let data=await PurchaseProductsModel.aggregate([
            {$match:{UserEmail:UserEmail,CreatedDate:{$gte:new Date(FromDate),$lte:new Date(ToDate)}}},{
                $facet:{
                    Total:[{
                        $group:{
                            _id:0,
                            TotalAmount:{$sum:"$Total"}
                        }
                    }],
                    Rows:[
                        {$lookup:{from:"products",localField:"ProductID",foreignField:"_id",as:"Product"}}
                    ]
                }
            }
        ])

        return {status:"success",data:data}
    }catch (error) {
        return{status:"fail",data:error.toString()};
    }
}

module.exports = PurchaseReportService;