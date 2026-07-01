import { Request, Response, Router, NextFunction } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { ListingValidator } from "../validators/ListingValidator";
import { ListingController } from "../controllers/ListingController";
import { Utils } from "../utils/Utils";

class ListingRouters {
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
      "/viewListings",
      GlobalMiddleware.auth,
      GlobalMiddleware.adminRole,
      GlobalMiddleware.checkError,
      (req: Request, res: Response, next: NextFunction) =>
        ListingController.getAllListings(req, res, next),
    );

    this.router.get(
      "/public",
      (req: Request, res: Response, next: NextFunction) =>
        ListingController.getAllListings(req, res, next),
    );

    this.router.get(
      "/public/:id",
      (req: Request, res: Response, next: NextFunction) =>
        ListingController.getListingById(req, res, next),
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleware.auth,
      GlobalMiddleware.adminRole,
      new Utils().multer.array("images", 5),
      ListingValidator.parseAmenities,
      ListingValidator.createListingValidator(),
      GlobalMiddleware.checkError,
      (req: Request, res: Response, next: NextFunction) =>
        ListingController.createListing(req, res, next),
    );
  }

  putRoutes() {
    this.router.put(
      "/update/:id",
      GlobalMiddleware.auth,
      new Utils().multer.array("images", 5),
      (req: Request, res: Response, next: NextFunction) => {
        if (typeof req.body.amenities === "string") {
          try {
            req.body.amenities = JSON.parse(req.body.amenities);
          } catch (e) {
            req.body.amenities = req.body.amenities
              .split(",")
              .map((s: string) => s.trim());
          }
        }
        next();
      },
      ListingValidator.updateListingValidator(),
      GlobalMiddleware.checkError,
      (req: Request, res: Response, next: NextFunction) =>
        ListingController.updateListing(req, res, next),
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete/:id",
      GlobalMiddleware.auth,
      (req: Request, res: Response, next: NextFunction) =>
        ListingController.deleteListing(req, res, next),
    );
  }

  patchRoutes() {}
}

export default new ListingRouters().router;
