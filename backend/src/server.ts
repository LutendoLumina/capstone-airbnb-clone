import express from "express";
import * as mongoose from "mongoose";
import { getEnviromentVariables } from "./enviroments/enviroment";
import { Utils } from "./utils/Utils";

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
    // Will handle parsing later
    this.app.use(express.json());
  }

  allowCors() {
    // Will handle CORS later
  }

  setRoutes() {
    // Will handle routing gates later
    this.app.get("/api/health", (req, res) => {
      res.status(200).json({
        status: "healthy",
        message: "Backend glue is connected and responding cleanly!",
      });
    });
  }

  handlerErrors() {
    // Will handle global errors later
  }

  error404Handler() {
    // Will handle 404s later
  }
}
