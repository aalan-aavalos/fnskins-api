import express from "express";
import { TrackedItemController } from "../controllers/trackedItem.controller";
import { ValidateZod } from "../middlewares/validateZod";
import { createSchema, updateSchema } from "../validators/trackedItemSchema";

class Skins {
  private router: express.Router;
  private controller = new TrackedItemController();
  private validateZod = new ValidateZod().validateZod;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    this.router.post("/", (req, res) => {
      res.json({ message: "Agregando skin trakeada" });
    });

    this.router.put("/:id", (req, res) => {
      res.json({ message: `Skin obtenida con el id ${req.params.id}` });
    });
    this.router.get("/", (req, res) => {
      res.json({ message: "Listando todas las skins del usuario" });
    });
    this.router.delete("/:id", (req, res) => {
      res.json({
        message: `Eliminando TODO registro de esta skin con el id ${req.params.id}`,
      });
    });
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default new Skins().getRouter();
