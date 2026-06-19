import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Jwt } from "../utils/Jwt";

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

  static async auth(req: any, res: Response, next: NextFunction) {
    const header_auth = req.headers.authorization; // Bearer token
    const token = header_auth ? header_auth.slice(7, header_auth.length) : null;
    // const authheader = header_auth.split(' ');
    try {
      if (!token) {
        req.errorStatus = 401;
        next(new Error("User does\n't exist"));
      }
      const decoded = await Jwt.jwtVerify(token);
      req.user = decoded;
      next();
    } catch (e) {
      next(e);
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
