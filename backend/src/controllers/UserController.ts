import { Request, Response, NextFunction } from "express";
import { Utils } from "../utils/Utils";
import { Jwt } from "../utils/Jwt";


export class UserController {

  static async login(req: any, res: Response, next: NextFunction) {
    const user = req.user;
    const password = req.body.password;

    const data = {
      password,
      encrypt_password: user.password,
    };

    try {
      await Utils.comparePassword(data);

      const payload = {
        email: user.email,
        type: user.type,
      };

      const userIdStr = user._id.toString();

      const access_token = Jwt.jwtSign(payload, userIdStr);

      const user_data = {
        username: user.username,
        email: user.email,
        type: user.type,
        status: user.status,
        created_at: user.createdAt,
        updated_at: user.updatedAt
      };

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: access_token,
        user: user_data,
      });
    } catch (e) {
      next(e);
    }
  }

}