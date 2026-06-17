import express from "express";

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
  }

  connectRedis() {
    // Will handle Redis connection later
  }

  connectMongoDB() {
    // Will handle MongoDB connection later
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
