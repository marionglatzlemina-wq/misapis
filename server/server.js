import express from 'express';
import cors from 'cors';
import indexRoutes from "../routes/index.routes.js";
import * as db from "../db/cnn_mongodb.js";

export default class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.apiPath = '/api';

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.apiPath, indexRoutes);
    }

    async listen() {
        try {
            await db.conectarMongoDB();

            this.app.listen(this.port, () => {
                console.log(`Servidor corriendo en puerto ${this.port}`);
            });

        } catch (error) {
            console.error('Error al conectar con MongoDB:', error);
            process.exit(1);
        }
    }
}