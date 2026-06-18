import { body, query } from "express-validator";
import User from "../models/User";

export class UserValidator {
  static login() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                //check role
                if (user.type == "user" || user.type == "admin") {
                  req.user = user;
                  return true;
                } else {
                  throw new Error("You are not an authorized user");
                }
              } else {
                throw new Error("No user registered with this email");
              }
            })
            .catch((e) => {
              throw new Error(e instanceof Error ? e.message : String(e));
            });
        }),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be between 8-20 characters"),
    ];
  }
}
