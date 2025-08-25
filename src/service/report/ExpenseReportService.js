const  ExpenseModel=require("../../model/Expenses/ExpensesModel");
const ExpenseReportService=async (Request)=>{
    try{
        let UserEmail=Request.headers['email'];
        let FromDate=Request.body['FromDate'];
        let ToDate=Request.body['ToDate'];

        let data=await ExpenseModel.aggregate([
            {$match:{UserEmail:UserEmail,CreatedDate:{$gte:new Date(FromDate),$lte:new Date(ToDate)}}},{
            $facet:{
                Total:[{
                    $group:{
                        _id:0,
                        TotalAmount:{$sum:"$Amount"}
                    }
                }],
                Rows:[
                    {$lookup:{from:"expensetypes",localField:"TypeID",foreignField:"_id",as:"Type"}}
                ]
            }
            }
        ])

        return {status:"success",data:data}
    }catch (error) {
        return{status:"fail",data:error.toString()};
    }
}

module.exports = ExpenseReportService;