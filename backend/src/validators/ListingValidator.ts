import { body } from "express-validator";
import { Request, Response, Router, NextFunction } from "express";
import "multer";

export class ListingValidator {

  static parseAmenities(req: Request, res: Response, next: NextFunction) {
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
  }

  static createListingValidator() {
    return [
      body("title", "Title is required").isString(),
      body("location", "Location address string is required").isString(),
      body("description", "Description is required").isString(),
      body("bedrooms", "Bedrooms must be +1").isInt({
        min: 0,
      }),
      body("bathrooms", "Bathrooms must be a +1").isInt({
        min: 0,
      }),
      body("guests", "Maximum guests is required").isInt({
        min: 1,
      }),
      body("base_price", "Base rental price is required").isFloat({
        min: 0.01,
      }),
      body("cleaning_fee", "Cleaning fee must be provided")
        .optional()
        .isFloat({ min: 0 }),
      body("service_fee", "Service fee must be provided")
        .optional()
        .isFloat({ min: 0 }),
      body(
        "occupancy_taxes",
        "State or city occupancy taxes must be provided",
      ).notEmpty(),
      body(
        "weekly_discount",
        "Weekly discount must be a valid percentage between 0 and 100",
      )
        .optional()
        .isFloat({ min: 0, max: 100 }),

      body("amenities", "Amenities is required").isArray(),

      body("images", "Listing image(s) is required").custom(
        (value, { req }) => {
          const files = req.files as Express.Multer.File[];
          if (files && files.length > 0) {
            return true;
          }
          throw new Error(
            "At least one property showcase image file is required.",
          );
        },
      ),
    ];
  }


  static updateListingValidator() {
  return [
    body("title", "Title must be a valid string").optional().isString(),
    body("location", "Location address must be a valid string").optional().isString(),
    body("description", "Description must be a valid string").optional().isString(),
    body("type", "Type must be a valid string").optional().isString(),
    
    body("bedrooms", "Bedrooms must be 0 or more").optional().isInt({ min: 0 }),
    body("bathrooms", "Bathrooms must be 0 or more").optional().isInt({ min: 0 }),
    body("guests", "Maximum guests must be 1 or more").optional().isInt({ min: 1 }),
    
    body("base_price", "Base rental price must be a positive number").optional().isFloat({ min: 0.01 }),
    body("cleaning_fee", "Cleaning fee must be 0 or more").optional().isFloat({ min: 0 }),
    body("service_fee", "Service fee must be 0 or more").optional().isFloat({ min: 0 }),
    body("occupancy_taxes", "Occupancy taxes must be 0 or more").optional().isFloat({ min: 0 }),
    body("weekly_discount", "Weekly discount must be a valid percentage between 0 and 100").optional().isFloat({ min: 0, max: 100 }),

    body("amenities", "Amenities must be provided as an array format").optional().isArray(),

    body("images").optional().custom((value, { req }) => {
      const files = req.files as Express.Multer.File[];
      if (files && files.length > 0) {
        return true;
      }
      return true; // Pass if no files are uploaded during update
    }),
  ];
}
}
