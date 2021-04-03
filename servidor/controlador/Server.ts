import express from "express";
import SocketIO from "socket.io";
import http from 'http';
import { SERVER_PORT } from "../environments/environment";
import * as socketUsuarios from '../sockets/SocketUsuarios';
import * as socketChatGeneral from '../sockets/SocketChatGeneral';

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
            //Sockets para los usuarios
            socketUsuarios.conectarUsuario(cliente, this.io);
            socketUsuarios.iniciarSesion(cliente,this.io);
            socketUsuarios.desconectarUsuario(cliente,this.io);
            socketUsuarios.actualizarUsuario(cliente,this.io); 
            socketUsuarios.enviarMensaje(cliente,this.io);
            socketUsuarios.obtenerUsuariosActivos(cliente,this.io);

            //Sockets para el chat general
            socketChatGeneral.obtenerMensajesGenerales(cliente,this.io);
        });
    }

    iniciarServidor(callback: any) {
        this.httpServer.listen(this.port, callback);
    }

}