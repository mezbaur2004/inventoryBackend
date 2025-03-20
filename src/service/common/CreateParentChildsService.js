const CreateParentChildsService = async (Request,ParentModel,ChildsModel,JoinPropertyName)=>{
const mongoose=require('mongoose');

    //Create Transaction Session
    const session= await mongoose.startSession()

    try{
        //Begin Transaction
        await session.startTransaction();
        //Parent Creation
        let Parent=Request.body['Parent']
        Parent.UserEmail=Request.headers['email'];
        //First Database Operation
        let ParentCreation=await ParentModel.create([Parent],{session});

        //Child Creation
        let Childs=Request.body['Childs'];
        await Childs.forEach((element)=>{
            element[JoinPropertyName]=ParentCreation[0]['_id'];
            element['UserEmail']=Request.headers['email'];
        });

        //Second Database Operation
        let ChildsCreation= await ChildsModel.insertMany(Childs,{session});

        //Transaction Success
        await session.commitTransaction();
        session.endSession();
        return {status:"success",Parents:ParentCreation,Childs:ChildsCreation}

    }catch(error){
        //Roll Back Transaction
        await session.abortTransaction();
        session.endSession();
        return {status:"fail",data:error.toString()};
    }

}
module.exports = CreateParentChildsService;