import express from 'express';
import { UserController } from '../controllers/UserController';

class UserRoutes {
    private router: express.Router;
    private controller = new UserController();

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    private routes() {
        this.router.post('/', this.controller.create)
        this.router.get('/', this.controller.findAll)
        this.router.get('/:id', this.controller.findOne)
        this.router.put('/:id', this.controller.update)
        this.router.delete('/:id', this.controller.delete)
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export default new UserRoutes().getRouter();
