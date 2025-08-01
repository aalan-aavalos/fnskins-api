import express from "express";
import { UsersController } from "../controllers/users.controller";
import { ValidateZod } from "../middlewares/validateZod";
import { createSchema, updateSchema } from "../validators/usersSchemas";

class UserRoutes {
  private router: express.Router;
  private controller = new UsersController();
  private validateZod = new ValidateZod().validateZod;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    this.router.post(
      "/",
      this.validateZod(createSchema),
      this.controller.create
    );
    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", this.controller.findOne);
    this.router.put(
      "/:id",
      this.validateZod(updateSchema),
      this.controller.update
    );
    this.router.delete("/:id", this.controller.delete);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default new UserRoutes().getRouter();
