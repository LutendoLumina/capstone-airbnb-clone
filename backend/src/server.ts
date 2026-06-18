import express from "express";
import * as mongoose from "mongoose";
import { getEnviromentVariables } from "./enviroments/enviroment";
import { Utils } from "./utils/Utils";
import UserRouters from "./routers/UserRouters";
import * as bodyParser from "body-parser";

export class Server {
  public app = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.handlerErrors();
    this.error404Handler();
  }

  setConfigs() {
    this.dotenvConfig();
    this.connectMongoDB();
    this.connectRedis();
    this.allowCors();
    this.configureBodyParser();
  }

  dotenvConfig() {
    Utils.dotenvConfig();
  }

  connectRedis() {
    // Will handle Redis connection later
  }

  connectMongoDB() {
    const dbUri = getEnviromentVariables().db_uri;

    mongoose
      .connect(dbUri)
      .then(() => console.log("Connected to mongodb"))
      .catch((err) => {
        console.error("MONGODB CONNECTION ERROR:", err);
        process.exit(1);
      });
  }

  configureBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  allowCors() {
    // Will handle CORS later
  }

  setRoutes() {
    this.app.use("/api/user", UserRouters);
  }

  handlerErrors() {
    // Will handle global errors later
  }

  error404Handler() {
    // Will handle 404s later
  }
}
