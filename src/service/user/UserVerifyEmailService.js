const OTPModel = require("../../model/Users/OTPModel");

const SendEmailUtility = require("../../utility/SendEMailUtility");

const  UserVerifyEmailService = async (Request,DataModel) =>{
    try{
        //email account query(taking email from params and then creating an otp code)
        let email = Request.params.email;
        let OTPCode = Math.floor(10000+Math.random()*90000);
        //first process(database)
        let UserCount = (await DataModel.aggregate([{$match:{email:email}},{$count:"total"}]));
        if (UserCount.length>0){
            //OTP Insert
            await OTPModel.create({email:email,otp: OTPCode})
            //email Send
            //second process(database)
            let SendEmail = await SendEmailUtility(email,"Your PIN Code is ="+OTPCode,"Inventory PIN Verification");
            return {status:"success",data:SendEmail}
        }else {
            return {status:"fail",data:"Users not found"};
        }
    }catch(error){
        return {status:"fail",data:error.toString()};
    }
}

module.exports=UserVerifyEmailService;