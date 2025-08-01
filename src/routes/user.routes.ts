import express from "express";
import { UserController } from "../controllers/user.controller";
import { ValidateZod } from "../middlewares/validateZod";
import { updateUserValidation } from "../validators/userSchema";

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
    // this.router.get("/:id", this.controller.findOne);
    // this.router.put(
    //   "/:id",
    //   this.validateZod(updateUserValidation),
    //   this.controller.update
    // );
    // this.router.delete("/:id", this.controller.delete);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default new UserRoutes().getRouter();
