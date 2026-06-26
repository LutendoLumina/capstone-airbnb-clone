import { Request, Response, Router, NextFunction } from "express";
import { ReservationValidator } from "../validators/ReservationValidator";
import { ReservationController } from "../controllers/ReservationController";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";

class ReservationRouters {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get(
      "/host",
      GlobalMiddleware.auth,
      (req: Request, res: Response, next: NextFunction) =>
        ReservationController.getReservationsByHost(req, res, next)
    );

    this.router.get(
      "/user",
      GlobalMiddleware.auth,
      (req: Request, res: Response, next: NextFunction) =>
        ReservationController.getReservationsByUser(req, res, next)
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleware.auth,
      ReservationValidator.createReservationValidator(),
      GlobalMiddleware.checkError,
      (req: Request, res: Response, next: NextFunction) =>
        ReservationController.createReservation(req, res, next)
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {
    this.router.delete(
      "/:id",
      GlobalMiddleware.auth,
      (req: Request, res: Response, next: NextFunction) =>
        ReservationController.deleteReservation(req, res, next)
    );
  }
}

export default new ReservationRouters().router;