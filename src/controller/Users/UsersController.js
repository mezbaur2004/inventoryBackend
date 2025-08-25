const DataModel=require("../../model/Users/UserModel");
const OTPModel=require("../../model/Users/OTPModel");
const UserCreateService=require("../../service/user/UserCreateService");
const UserLoginService=require("../../service/user/UserLoginService");
const UserUpdateService=require("../../service/user/UserUpdateService");
const UserDetailsService=require("../../service/user/UserDetailsService");
const UserVerifyOtpService=require("../../service/user/UserVerifyOtpService");
const UserVerifyEmailService=require("../../service/user/UserVerifyEmailService");
const UserResetPassService=require("../../service/user/UserResetPassService");

exports.Registration=async (req,res)=>{
    let result = await UserCreateService(req,DataModel)
    res.status(200).json(result);
}

exports.Login=async (req,res)=>{
    let result = await UserLoginService(req,DataModel)
    res.status(200).json(result);
}

exports.ProfileDetails=async (req,res)=>{
    let result = await UserDetailsService(req,DataModel)
    res.status(200).json(result);
}

exports.ProfileUpdate=async (req,res)=>{
    let result = await UserUpdateService(req,DataModel)
    res.status(200).json(result);
}

exports.RecoverVerifyEmail=async (req,res)=>{
    let result = await UserVerifyEmailService(req,DataModel)
    res.status(200).json(result);
}

exports.RecoverVerifyOTP=async (req,res)=>{
    let result = await UserVerifyOtpService(req,OTPModel)
    res.status(200).json(result);
}


exports.RecoverResetPass=async (req,res)=>{
    let result = await UserResetPassService(req,DataModel)
    res.status(200).json(result);
}



