import * as dotenv from "dotenv";
import path from "path";

export class Utils {
  static dotenvConfig() {
    dotenv.config({ path: path.resolve(__dirname, "../../.env") });
  }
}
