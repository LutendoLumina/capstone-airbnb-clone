import { body, query } from "express-validator";
import Listing from "../../src/models/Listing";

export class ReservationValidator {

  static createReservationValidator() {
    return [
      body("listing_id", "Listing ID is required")
        .isString()
        .custom((listing_id, { req }) => {
          return Listing.findById(listing_id).then((listing) => {
            if (!listing) {
              throw new Error("Listing property does not exist");
            } else {
              req.listing = listing;
              return true;
            }
          });
        }),
      body("start_date", "Start date is required").isISO8601().toDate(),
      body("end_date", "End date is required").isISO8601().toDate(),
      body("total_price", "Total price is required").isNumeric(),
    ];
  }
}
