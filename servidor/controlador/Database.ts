import { DB_PASS, DB_USER } from './../environments/environment';
import mongoose from "mongoose";

export default class ConexionDB {

    private static _instance: ConexionDB;

    public static get obtenerInstancia() {
        return this._instance || (this._instance = new this());
    }

    constructor() {
        this.conectarBD();
    }

    public conectarBD() {
        try {
            mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.91y4m.mongodb.net/sockets`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
            console.log("Conexión con la BD");
            
        } catch (error) {
            console.log(error);
            process.exit(0)
        }
    }

}