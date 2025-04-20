import express from 'express';
import { TrackedItemController } from '../controllers/TrackedItemController';

class TrackedItemRoutes {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    this.router.post('/track', TrackedItemController.trackItem);
    this.router.get('/:userId', TrackedItemController.getTrackedItems);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default new TrackedItemRoutes().getRouter();
