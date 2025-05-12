import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { ValidateZod } from "../middlewares/validateZod";
import {
  loginSchema,
  registerSchema,
  sendCodeSchema,
  verifyEmailSchema,
} from "../validators/authSchemas";

class AuthRoutes {
  private router: express.Router;
  private controller = new AuthController();
  private validateZod = new ValidateZod().validateZod;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    this.router.post(
      "/login",
      this.validateZod(loginSchema),
      this.controller.loginUser
    );
    this.router.post(
      "/register",
      this.validateZod(registerSchema),
      this.controller.registerUser
    );
    this.router.post(
      "/verify-email",
      this.validateZod(verifyEmailSchema),
      this.controller.verifyEmail
    );
    this.router.post(
      "/send-code",
      this.validateZod(sendCodeSchema),
      this.controller.sendVerificationCode
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();
