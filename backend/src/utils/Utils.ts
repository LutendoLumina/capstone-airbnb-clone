import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import path from "path";

export class Utils {
  static dotenvConfig() {
    dotenv.config({ path: path.resolve(__dirname, "../../.env") });
  }

  static async comparePassword(data: {
    password: string;
    encrypt_password: string;
  }): Promise<boolean> {
    const isMatch = await bcrypt.compare(data.password, data.encrypt_password);

    if (!isMatch) {
      throw new Error("User and Password do not match");
    }

    return true;
  }

  static async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
