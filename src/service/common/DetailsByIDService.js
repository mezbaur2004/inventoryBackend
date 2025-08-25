const mongoose=require('mongoose');
const DetailsByIDService=async (Request,DataModel)=>{
    try{
        let DetailsID=Request.params.id;
        let UserEmail=Request.headers['email'];

        const ObjectID=mongoose.Types.ObjectId;
        let QueryObject={
            _id:new ObjectID(DetailsID),
            UserEmail:UserEmail
        };

        let data=await DataModel.aggregate([
            {$match:QueryObject}
        ])

        return {status:"success",data:data};
    }catch(error){
        return{status:"fail", data:error.toString()};
    }
}
module.exports = DetailsByIDService;