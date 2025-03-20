const DeleteService = async (Request,Model)=>{
    try{
        let DeleteID=Request.params.id;
        let UserEmail=Request.headers['email'];

        let QueryObject={
            _id:DeleteID,
            UserEmail:UserEmail
        }

        let Delete=await Model.deleteMany(QueryObject);
        return {status:"success",data:Delete};
    }catch(error){
        return {status:"fail",error:error.toString()};
    }
}

module.exports = DeleteService;