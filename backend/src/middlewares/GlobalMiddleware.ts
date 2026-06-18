import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export class GlobalMiddleware {
  static checkError(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      (error as any).errorStatus = 400;
      return next(error);
    } else {
      next();
    }
  }

  static async adminRole(req: any, res: Response, next: NextFunction) {
    const user = req.user;

    if (user.type !== "admin") {
      // req.errorStatus = 401;
      next(new Error("You are an unauthorized user"));
    }
    next();
  }
}
