import { Enviroment } from "./enviroment";

export const ProdEnviroment = (): Enviroment => ({
    db_uri: process.env.PROD_DB_URI || ""
});