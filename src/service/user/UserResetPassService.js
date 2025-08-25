const OTPModel = require("../../model/Users/OTPModel");

const UserResetPassService = async (Request, DataModel) => {
    try {
        let email = Request.body['email'];
        let OTPCode = Request.body['otp'];
        let NewPass = Request.body['password'];

        // 1. Check OTP validity (status 0 = unused)
        let OTPRecord = await OTPModel.findOne({ email: email, otp: OTPCode, status: 0 });

        if (!OTPRecord) {
            return { status: "fail", data: "Invalid or already used OTP" };
        }

        // 2. Update password
        let PassUpdate = await DataModel.updateOne(
            { email: email },
            { password: NewPass }
        );

        // 3. Mark OTP as used
        await OTPModel.updateOne(
            { email: email, otp: OTPCode },
            { status: 1 }
        );

        return { status: "success", data: PassUpdate };

    } catch (error) {
        return { status: "fail", data: error.toString() };
    }
};

module.exports = UserResetPassService;
