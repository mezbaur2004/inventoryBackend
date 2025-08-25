const mongoose=require('mongoose');

const DeleteParentChildsService=async (Request,ParentModel,ChildsModel,JoinPropertyName)=>{

    const session=await mongoose.startSession();

    try{
        //Begin Transaction
        await session.startTransaction();

        //Creation
        let DeleteID=Request.params.id;
        let UserEmail=Request.headers['email'];

        let ChildQueryObject = {
            [JoinPropertyName]: DeleteID,
            UserEmail: UserEmail // Correct key
        };

        let ParentQueryObject = {
            _id: DeleteID,
            UserEmail: UserEmail // Correct key
        };


        //First Database Process
        let ChildsDelete=await ChildsModel.deleteMany(ChildQueryObject).session(session);

        //Second Database Process
        let ParentDelete=await ParentModel.deleteMany(ParentQueryObject).session(session);

        //Commit Transaction
        await session.commitTransaction();
        session.endSession();
        return {status:"success",Parents:ParentDelete,Childs:ChildsDelete}
    }catch(error){
        //Roll Back Transaction
        await session.abortTransaction();
        session.endSession();
        return {status:"fail",data:error.toString()};
    }
}

module.exports = DeleteParentChildsService;