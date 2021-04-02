import express from "express";
import SocketIO from "socket.io";
import http from 'http';
import { SERVER_PORT } from "../environments/environment";
import * as socketUsuarios from '../sockets/SocketUsuarios';

export default class Server {

    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: SocketIO.Server;
    private httpServer: http.Server;

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = require("socket.io")(this.httpServer, {
            allowEIO3: true,
            cors: {
                origin: true,
                credentials: true
            }
        });
        this.escucharSockets();
    }

    public static get obtenerInstancia() {
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {
        this.io.on('connection', cliente => {
            socketUsuarios.conectarUsuario(cliente, this.io);
            socketUsuarios.iniciarSesion(cliente,this.io);
            // socketUsuarios.configurarUsuario(cliente,this.io); 
            // socketUsuarios.desconectarPrueba(cliente,this.io);
            // socketUsuarios.enviarMensaje(cliente,this.io);
            // socketUsuarios.obtenerUsuariosActivos(cliente,this.io);
        });
    }

    iniciarServidor(callback: any) {
        this.httpServer.listen(this.port, callback);
    }

}