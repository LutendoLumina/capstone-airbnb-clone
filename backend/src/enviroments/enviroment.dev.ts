import { Enviroment } from "./enviroment";

export const DevEnviroment = (): Enviroment => ({
    db_uri: process.env.DEV_DB_URI || "",
    jwt_access_secret_key: process.env.DEV_JWT_ACCESS_TOKEN_SECRET_KEY!
});