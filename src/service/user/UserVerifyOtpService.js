const OTPModel = require("../../model/Users/OTPModel");

const UserVerifyOtpService = async (Request) => {
    try {
        let email = Request.params.email;
        let OTPCode = Request.params.otp;
        let status = 0; // unused OTP

        // Check OTP validity
        let OTPRecord = await OTPModel.findOne({ email: email, otp: OTPCode, status: status });

        if (OTPRecord) {
            // OTP is valid
            return { status: "success", data: "OTP verified successfully" };
        } else {
            return { status: "fail", data: "Invalid or expired OTP" };
        }

    } catch (error) {
        return { status: "fail", data: error.toString() };
    }
};

module.exports = UserVerifyOtpService;
