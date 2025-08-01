import express from "express";
import { UserController } from "../controllers/user.controller";
import { ValidateZod } from "../middlewares/validateZod";
import {
  updateUserValidation,
  sendCodeSchema,
  verifyEmailSchema,
} from "../validators/userSchema";

class UserRoutes {
  private router: express.Router;
  private controller = new UserController();
  private validateZod = new ValidateZod().validateZod;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    this.router.get("/:id", this.controller.getUserProfile);
    this.router.put(
      "/:id",
      this.validateZod(updateUserValidation),
      this.controller.updateUserProfile
    );
    this.router.post(
      "/delete-request",
      this.validateZod(sendCodeSchema),
      this.controller.sendDeleteCode
    );
    this.router.post(
      "/delete-confirm",
      this.validateZod(verifyEmailSchema),
      this.controller.verifyDeleteCode
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default new UserRoutes().getRouter();
