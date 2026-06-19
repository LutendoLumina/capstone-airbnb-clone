import * as JWT from "jsonwebtoken";
import { getEnviromentVariables } from "../enviroments/enviroment";
import * as Crypto from "crypto";

export class Jwt {
  static jwtSign(payload: any, userId: any) {
    // Jwt.gen_secret_key();

    return JWT.sign(payload, getEnviromentVariables().jwt_access_secret_key, {
      expiresIn: "1h",
      audience: String(userId),
      issuer: "lupreshie@gmail.com",
    });
  }

  static jwtVerify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      JWT.verify(
        token,
        getEnviromentVariables().jwt_access_secret_key,
        (err, decoded) => {
          if (err) {
            // Specific error handling
            if (err.name === "TokenExpiredError") {
              return reject(
                new Error("Token has expired. Please login again."),
              );
            }
            if (err.name === "JsonWebTokenError") {
              return reject(new Error("Invalid token. Authentication failed."));
            }
            return reject(err);
          } else if (!decoded) reject(new Error("User is not authorised."));
          else resolve(decoded);
        },
      );
    });
  }

  //   static gen_secret_key() {
  //     const DEV_JWT_ACCESS_TOKEN_SECRET_KEY =
  //       Crypto.randomBytes(32).toString("hex");
  //     const DEV_JWT_REFRESH_TOKEN_SECRET_KEY =
  //       Crypto.randomBytes(32).toString("hex");

  //     const PROD_JWT_ACCESS_TOKEN_SECRET_KEY =
  //       Crypto.randomBytes(32).toString("hex");
  //     const PROD_JWT_REFRESH_TOKEN_SECRET_KEY =
  //       Crypto.randomBytes(32).toString("hex");

  //     console.table({
  //       DEV_JWT_ACCESS_TOKEN_SECRET_KEY,
  //       DEV_JWT_REFRESH_TOKEN_SECRET_KEY,
  //       PROD_JWT_ACCESS_TOKEN_SECRET_KEY,
  //       PROD_JWT_REFRESH_TOKEN_SECRET_KEY,
  //     });
  //   }
}
