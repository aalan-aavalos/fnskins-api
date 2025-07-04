import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import userRoutes from "./routes/users.routes";
import trackedItemRoutes from "./routes/tracked.routes";
import authRoutes from "./routes/auth.routes";

import { adminOnly, authMiddleware } from "./middlewares/auth.middleware";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // Limita a 100 peticiones por IP cada 15 minutos
      message: "Demasiadas peticiones desde esta IP, intenta más tarde.",
    });
    this.app.use(limiter);

    this.app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "https://tu-frontend-en-produccion.com",
        ],
        credentials: true,
      })
    );
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  private routes() {
    this.app.get("/favicon.ico", (req, res) => {
      res.end();
    });
    this.app.use("/api/auth", authRoutes);
    this.app.use(authMiddleware);
    this.app.use("/api/user", (req, res) => {
      res.json({ message: "Ruta de usuario" });
    });
    this.app.use("/api/skins", (req, res) => {
      res.json({ message: "Ruta de skins" });
    });
    this.app.use(adminOnly);
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/tracked-items", trackedItemRoutes);
  }

  public static getApp(): express.Application {
    return new App().app;
  }
}

export default App;
