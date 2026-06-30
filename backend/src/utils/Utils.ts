import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import path from "path";
import { Request } from "express";
import multer from "multer";


const storageOptions = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/" + file.fieldname);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedMimetypes = [
    "image/jpeg",
    "image/jpg", 
    "image/png",
    "image/webp",
    "image/avif",
  ];

  if (allowedMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export class Utils {

  public multer = multer({ storage: storageOptions, fileFilter: fileFilter });

  static dotenvConfig() {
    dotenv.config({ path: path.resolve(__dirname, "../../.env") });
  }

  static async comparePassword(data: {
    password: string;
    encrypt_password: string;
  }): Promise<boolean> {
    const isMatch = await bcrypt.compare(data.password, data.encrypt_password);

    if (!isMatch) {
      throw new Error("Your password is incorrect. Please try again.");
    }

    return true;
  }

  static async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
