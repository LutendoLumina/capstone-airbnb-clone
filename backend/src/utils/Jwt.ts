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
