import { DevEnviroment } from "./enviroment.dev";
import { ProdEnviroment } from "./enviroment.prod";

export interface Enviroment {
    db_uri: string;
    jwt_access_secret_key: string;
}

export function getEnviromentVariables() {
    if(process.env.NODE_ENV === "production") {
        return ProdEnviroment();
    }
    return DevEnviroment();
}