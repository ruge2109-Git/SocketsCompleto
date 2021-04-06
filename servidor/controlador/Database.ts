import { DB_NAME, DB_PASS, DB_USER } from './../environments/environment';
import mongoose from "mongoose";

export default class ConexionDB {

    private static _instance: ConexionDB;

    public static get obtenerInstancia() {
        return this._instance || (this._instance = new this());
    }

    constructor() {
        this.conectarBD();
    }

    async conectarBD() {
        try {
            const urlBD = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.91y4m.mongodb.net/${DB_NAME}`;
            await mongoose.connect(urlBD, {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useFindAndModify: false, 
                useCreateIndex: true 
            });
            console.log("Conexión realizada");
            
            
        } catch (error) {
            console.log(error);
            process.exit(0)
        }
    }

}