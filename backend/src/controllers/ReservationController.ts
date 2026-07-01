import { NextFunction, Response } from "express";
import Reservation from "../models/Reservation";
import Listing from "../models/Listing";

export class ReservationController {

  static async createReservation(req: any, res: Response, next: NextFunction) {
    const data = req.body;
    const user_id = req.user.user_id || req.user._id || req.user.aud;

    try {
      const reservationData = {
        listing_id: data.listing_id,
        user_id,
        start_date: data.start_date,
        end_date: data.end_date,
        total_price: data.total_price,
        status: "confirmed"
      };

      const reservation = await new Reservation(reservationData).save();
      res.status(201).send({
        success: true,
        message: "Reservation compiled successfully",
        data: reservation
      });
    } catch (e) {
      next(e);
    }
  }

  static async getReservationsByHost(req: any, res: Response, next: NextFunction) {
    const host_id = req.user.user_id || req.user._id || req.user.aud;

    try {
      // Find listings belonging to this specific host
      const hostProperties = await Listing.find({ createdBy: host_id }).select("_id");
      const propertyIds = hostProperties.map((prop) => prop._id);

      // Fetch reservations matching those properties
      const reservations = await Reservation.find({ listing_id: { $in: propertyIds } })
        .populate("listing_id", "title location base_price")
        .populate("user_id", "username email")
        .sort({ created_at: -1 });

      res.status(200).send({ success: true, data: reservations });
    } catch (e) {
      next(e);
    }
  }

  static async getReservationsByUser(req: any, res: Response, next: NextFunction) {
    const user_id = req.user.user_id || req.user._id || req.user.aud;

    try {
      const reservations = await Reservation.find({ user_id })
        .populate("listing_id", "title location base_price images")
        .sort({ created_at: -1 });

      res.status(200).send({ success: true, data: reservations });
    } catch (e) {
      next(e);
    }
  }

  static async deleteReservation(req: any, res: Response, next: NextFunction) {
    const reservationId = req.params.id;

    try {
      const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
      if (!deletedReservation) {
        res.status(404).send({ success: false, message: "Reservation record not found" });
        return;
      }
      res.status(200).send({ success: true, message: "Reservation cancelled and deleted successfully" });
    } catch (e) {
      next(e);
    }
  }

  static async getBookedDates(req: any, res: Response, next: NextFunction) {
  const { listing_id } = req.params;

  try {
    const reservations = await Reservation.find({ listing_id }).select("start_date end_date");

    // Generate all individual booked dates between start and end
    const bookedDates: Date[] = [];
    reservations.forEach((res) => {
      const start = new Date(res.start_date);
      const end = new Date(res.end_date);
      const current = new Date(start);
      while (current <= end) {
        bookedDates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });

    res.status(200).json({ success: true, data: bookedDates });
  } catch (e) {
    next(e);
  }
}
}