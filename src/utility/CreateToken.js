const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY || "SecretKey12345";
const CreateToken=async(data)=>{
    let Payload={exp:Math.floor(Date.now()/1000)+(10*24*60*60),data:data};
    return await jwt.sign(Payload,jwtKey);
}
module.exports=CreateToken;