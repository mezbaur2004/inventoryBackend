const CreateToken = require("../../utility/CreateToken");

const UserLoginService = async (Request, DataModel) => {
    try {
        let user = await DataModel.findOne({ email: Request.body.email });

        if (!user) {
            return { status: "unauthorized", message: "User not found" };
        }

        // Manually check if the provided password matches the stored password
        if (user.password !== Request.body.password) {
            return { status: "unauthorized", message: "Incorrect password" };
        }
        let token = await CreateToken(user.email);
        return { status: "success", token: token, data: user };
    } catch (error) {
        return { status: "fail", data: error.toString() };
    }
};

module.exports = UserLoginService;
