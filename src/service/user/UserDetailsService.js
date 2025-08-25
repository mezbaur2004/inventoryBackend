const UserDetailsService= async (Request,DataModel)=>{
    try{
        let data=await DataModel.aggregate([{$match:{email:Request.headers['email']}},{$project:{password:0,_id:0}}]);
        return {status:"success",data:data};
    }catch (error){
        return {status:"error",data:error.toString()};
    }
}

module.exports=UserDetailsService;