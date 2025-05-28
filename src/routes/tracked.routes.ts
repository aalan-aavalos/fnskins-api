import express from "express";
import { TrackedItemController } from "../controllers/trackedItem.controller";
import { ValidateZod } from "../middlewares/validateZod";
import { createSchema, updateSchema } from "../validators/trackedItemSchema";

class TrackedItemRoutes {
  private router: express.Router;
  private controller = new TrackedItemController();
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
    this.router.get("/byUserID/:userId", this.controller.findOneByUserId);
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

export default new TrackedItemRoutes().getRouter();
