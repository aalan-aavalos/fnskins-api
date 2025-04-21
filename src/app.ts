import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import trackedItemRoutes from "./routes/tracked.routes";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/tracked-items", trackedItemRoutes);
  }

  public static getApp(): express.Application {
    return new App().app;
  }
}

export default App;
