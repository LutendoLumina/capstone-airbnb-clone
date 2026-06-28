import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import { getEnviromentVariables } from "./enviroments/enviroment";
import { Utils } from "./utils/Utils";
import * as bodyParser from "body-parser";
import cors from "cors";
import * as path from 'path';
import UserRouters from "./routers/UserRouters";
import ListingRouters from "./routers/ListingRouters";
import ReservationRouters from "./routers/ReservationRouters";


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
    this.app.use(cors({ origin: 'http://localhost:5173' }));

    this.app.use('/uploads', express.static(path.join(__dirname, '../src/uploads')));

  }

  setRoutes() {
    this.app.use("/api/user", UserRouters);
    this.app.use("/api/listings", ListingRouters);
    this.app.use("/api/reservations", ReservationRouters);
  }

  handlerErrors() {
    this.app.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        console.error("Error caught by global handler:", error.message);

        const errorStatus = (error as any).errorStatus || 500;
        res.status(errorStatus).json({
          message: error.message || "Something went wrong. Please try again",
          status_code: errorStatus,
        });
      },
    );
  }

  error404Handler() {
    // this.app.use((req, res) => {
    //   console.log("404 Not Found:", req.method, req.path);
    //   res.status(404).json({
    //     message: "Not found",
    //     status_code: 404,
    //   });
    // });
  }
}
