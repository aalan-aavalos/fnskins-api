import express from 'express';

import dotenv from 'dotenv';
import App from './app';
import { SkinCron } from './cron/skinCron';  // Importamos el cron


dotenv.config();

class Server {
    private app: express.Application;
    private port: string | number;

    constructor() {
        this.app = App.getApp();
        this.port = process.env.PORT || 5000;
        // SkinCron.start();
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}

const server = new Server();
server.start();
