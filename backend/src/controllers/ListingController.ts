import { Request, Response, NextFunction } from "express";
import "multer";
import Listing from "../models/Listing";

export class ListingController {
  static async createListing(req: any, res: Response, next: NextFunction) {
    try {
      console.log("--- INSIDE REQ.USER POOL ---");
      console.log(req.user);
      console.log("----------------------------");
      const listing = req.body;

      const files = req.files as Express.Multer.File[];
      const imagePaths = files ? files.map((file) => file.path) : [];

      const listingData = {
        title: listing.title,
        location: listing.location,
        description: listing.description,
        type: listing.type,
        bedrooms: parseInt(listing.bedrooms),
        bathrooms: parseInt(listing.bathrooms),
        guests: parseInt(listing.guests),
        base_price: parseFloat(listing.base_price),
        cleaning_fee: parseFloat(listing.cleaning_fee),
        service_fee: parseFloat(listing.service_fee),
        occupancy_taxes: parseFloat(listing.occupancy_taxes),
        weekly_discount: parseFloat(listing.weekly_discount),

        amenities:
          typeof listing.amenities === "string"
            ? JSON.parse(listing.amenities)
            : listing.amenities,

        images: imagePaths,
        createdBy: req.user.aud,
      };

      const listingDoc = await new Listing(listingData).save();

      res.status(201).json({
        success: true,
        message: "Accomodation listing created successfully",
        data: listingDoc,
      });
    } catch (error) {
      next(error);
    }
  }
}
