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
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleware.auth,
      GlobalMiddleware.adminRole,
      new Utils().multer.array("images", 5),

      // TEMPORARY DEBUG - remove after fixing
      // (req: Request, res: Response, next: NextFunction) => {
      //   console.log("FILES:", req.files);
      //   console.log("FILE MIMETYPES:", (req.files as any[])?.map(f => f.mimetype));
      //   console.log("BODY:", req.body);
      //   next();
      // },

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

      ListingValidator.createListingValidator(),
      GlobalMiddleware.checkError,
      (req: Request, res: Response, next: NextFunction) =>
        ListingController.createListing(req, res, next),
    );
  }

  patchRoutes() {}

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
}

export default new ListingRouters().router;
