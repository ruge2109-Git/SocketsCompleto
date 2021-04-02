import ConexionDB from './controlador/Database';
import Server from './controlador/Server';
import usuarioRutas from './rutas/UsuarioRutas';
import express from "express";

const conn = ConexionDB.obtenerInstancia;
const server = Server.obtenerInstancia;
server.app.use(express.urlencoded({extended:true}));
server.app.use(express.json());

// server.app.use(cors({origin:true,credentials:true}));
server.app.use("/",usuarioRutas);

server.iniciarServidor(()=>{
    console.log("Servidor corriendo");
});