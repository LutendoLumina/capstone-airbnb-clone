import { Enviroment } from "./enviroment";

export const DevEnviroment = (): Enviroment => ({
    db_uri: process.env.DEV_DB_URI || ""
});