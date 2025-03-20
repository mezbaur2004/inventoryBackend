const UpdateService=async (Request,DataModel)=>{
    try {
     let UserEmail=Request.headers['email'];
     let id=Request.params.id;
     let PostBody=Request.body;
     let data=await DataModel.updateOne({UserEmail:UserEmail,_id:id},PostBody);
     return {status:"success",data:data};
    }catch (error){
        return {status:"fail",message:error.toString()};
    }
}

module.exports=UpdateService;