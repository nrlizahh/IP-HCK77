const { User } = require("../models");
const { signToken } = require("../helpers/jwt");

module.exports = class UserController {
  static async login(req, res, next) {
    const { email } = req.body;
    try {
      if (!email) {
        return next({ name: "BadRequest", message: "Email is required" });
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next({
          name: "Unauthorized",
          message: "Email is required",
        });
      }
      const access_token = signToken({ id: user.id });

      res.status(200).json({
        access_token,
      });
    } catch (err) {
      console.log("🚀 ~ UserController ~ login ~ err:", err);
      next();
    }
  }
};
