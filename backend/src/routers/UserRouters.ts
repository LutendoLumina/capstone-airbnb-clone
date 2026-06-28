import { Request, Response, Router } from "express";
import { NextFunction } from "express-serve-static-core";
import { UserController } from "../controllers/UserController";
import { UserValidator } from "../validators/UserValidators";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";

class userRouters {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {}

  postRoutes() {
    this.router.post(
      "/login",
      UserValidator.login(),
      GlobalMiddleware.checkError,
      (req: Request, res: Response, next: NextFunction) =>
        UserController.login(req, res, next),
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new userRouters().router;
