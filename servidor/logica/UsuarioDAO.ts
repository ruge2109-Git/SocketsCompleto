import { UsuarioDTO, usuarioBD, UsuarioDTOBD } from "../modelo/Usuario";
import { ObjectID } from 'mongodb';
export class UsuarioDAO {

    private static _instance: UsuarioDAO;
    private listaActivos: UsuarioDTO[] = [];

    constructor() {
    }

    async agregarUsuario(usuario: UsuarioDTO) {
        try {
            const usuarioNuevo: UsuarioDTOBD = await usuarioBD.create({
                nombres: usuario.nombres,
                email: usuario.email,
                telefono: usuario.telefono,
                nomUsuario: usuario.nomUsuario,
                clave: usuario.clave
            });
            await usuarioNuevo.save();
            return usuario;
        }
        catch (error) {
            console.log(error);
            return "NADA";
        }
    }

    public static get obtenerInstancia() {
        return this._instance || (this._instance = new this());
    }

    conectarUsuario(usuarioNuevo: UsuarioDTO) {
        let usuarioExiste = false;
        this.listaActivos.forEach(usuario => {
            if (usuario.idSocket === usuarioNuevo.idSocket) {
                usuarioExiste = true;
            }
        });

        if (!usuarioExiste) {
            this.listaActivos.push(usuarioNuevo);
        }
        return usuarioNuevo;
    }

    desconectarUsuario(idSocket: any) {
        this.listaActivos = this.listaActivos.filter(user => {
            return idSocket != user.idSocket;
        });
        return this.listaActivos;
    }

    actualizarUsuarios(usuarioNuevo: UsuarioDTO, idSocket: string) {

        this.listaActivos.filter(usuario => {
            if (usuario.idSocket === idSocket) {
                usuario.nombres = usuarioNuevo.nombres;
                usuario.nomUsuario = usuarioNuevo.nomUsuario;
                usuario.email = usuarioNuevo.email;
                usuario.telefono = usuarioNuevo.telefono;
                usuario.nomUsuario = usuarioNuevo.nomUsuario;
                usuario.clave = usuarioNuevo.clave;
            }
        })
        return usuarioNuevo;
    }

    async obtenerTodosLosUsuarios() {
        try {
            const usuarios = await usuarioBD.find();
            return usuarios;
        }
        catch (error) {
            console.log("ERROR", error);
        }
    }

    async obtenerUsuarioPorNombreUsuario(nomUsuario: string) {
        try {
            const productos = await usuarioBD.find({ nomUsuario: nomUsuario })
            return productos;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }

    obtenerUsuariosActivos() {
        return this.listaActivos.filter(usuario => {
            return usuario.nomUsuario != '' && usuario.nomUsuario != null;
        });
    }

    obtenerUsuarioActivoPorNomUsuario(nomUsuario: string): UsuarioDTO {
        let usuarioR: UsuarioDTO = new UsuarioDTO("0");

        this.listaActivos.forEach(usuario => {
            if (usuario.nomUsuario === nomUsuario) {
                usuarioR = usuario;
            }
        });
        return usuarioR;
    }

    async modificarUsuarioBD(usuario: UsuarioDTO) {
        try {
            const usuarioNuevo = {
                "_id": usuario._id,
                "nombres":usuario.nombres,
                "email":usuario.email,
                "telefono":usuario.telefono,
                "nomUsuario":usuario.nomUsuario,
                "clave":usuario.clave
            };

            await usuarioBD.findOneAndUpdate({ _id: usuario._id }, usuarioNuevo);
            return usuarioBD;
        }
        catch (e) {
            console.log(e);
            return "";
        }
    }

    async eliminarUsuarioBD(usuario:UsuarioDTO){
        try{
            await usuarioBD.findByIdAndDelete(usuario._id);
        }
        catch(e){
            console.log(e);
        }
    }

    async obtenerUsuarioPorId(idUsuario: string) {
        try {
            let payload = {
                _id: idUsuario
            }
            const usuario = await usuarioBD.findById(payload);
            return usuario;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

}