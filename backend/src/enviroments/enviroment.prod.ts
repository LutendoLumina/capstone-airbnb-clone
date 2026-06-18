import { Enviroment } from "./enviroment";

export const ProdEnviroment = (): Enviroment => ({
    db_uri: process.env.PROD_DB_URI || "",
    jwt_access_secret_key: process.env.DEV_JWT_ACCESS_TOKEN_SECRET_KEY!

});