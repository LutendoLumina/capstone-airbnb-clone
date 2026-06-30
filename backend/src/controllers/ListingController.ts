import { Request, Response, NextFunction } from "express";
import "multer";
import Listing from "../models/Listing";

export class ListingController {
  static async createListing(req: any, res: Response, next: NextFunction) {
    try {
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

  static async getAllListings(req: Request, res: Response, next: NextFunction) {
    try {
      // Fetch all listings from MongoDB and sort them by newest first
      const listings = await Listing.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        results: listings.length,
        data: listings,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getListingById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const listing = await Listing.findById(id);

      if (!listing) {
        res.status(404);
        throw new Error("Accommodation property listing not found.");
      }

      res.status(200).json({
        success: true,
        data: listing,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteListing(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deletedListing = await Listing.findByIdAndDelete(id);

      if (!deletedListing) {
        res.status(404);
        throw new Error("Accommodation listing not found or already deleted.");
      }

      res.status(200).json({
        success: true,
        message: "Accommodation listing deleted successfully",
        data: deletedListing,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateListing(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const listing = req.body;

      const updatedData: any = { ...req.body };

      const files = req.files as Express.Multer.File[];

      if (req.body.bedrooms) updatedData.bedrooms = parseInt(req.body.bedrooms);
      if (req.body.bathrooms)
        updatedData.bathrooms = parseInt(req.body.bathrooms);
      if (req.body.guests) updatedData.guests = parseInt(req.body.guests);
      if (req.body.base_price)
        updatedData.base_price = parseFloat(req.body.base_price);
      if (req.body.cleaning_fee)
        updatedData.cleaning_fee = parseFloat(req.body.cleaning_fee);
      if (req.body.service_fee)
        updatedData.service_fee = parseFloat(req.body.service_fee);

      if (files && files.length > 0) {
        updatedData.images = files.map((file) => file.path);
      }

      const listingDoc = await Listing.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      });

      if (!listingDoc) {
        res.status(404);
        throw new Error("Accommodation listing not found.");
      }

      res.status(200).json({
        success: true,
        message: "Accommodation listing updated successfully",
        data: listingDoc,
      });
    } catch (error) {
      next(error);
    }
  }
}
