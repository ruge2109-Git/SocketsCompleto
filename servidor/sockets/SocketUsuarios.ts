import { UsuarioDAO } from "../logica/UsuarioDAO";
import { UsuarioDTO } from "../modelo/Usuario";

export const usuarioDAO = UsuarioDAO.obtenerInstancia;


export const conectarUsuario = (cliente: any, io: any) => {
    let usuario = new UsuarioDTO(cliente.id);
    usuarioDAO.conectarUsuario(usuario);
}

export const desconectarUsuario = (cliente:any,io:any)=>{
    cliente.on("disconnect", () => {
        usuarioDAO.desconectarUsuario(cliente.id);
        io.emit("usuarios-activos", usuarioDAO.obtenerUsuariosActivos());
    })
}

export const actualizarUsuario = (cliente: any, io: any) => {
    cliente.on("actualizar-usuario-socket", (payload: any) => {
        usuarioDAO.actualizarUsuarios(payload,cliente.id);
        io.emit("usuarios-activos", usuarioDAO.obtenerUsuariosActivos());
    })
}

export const obtenerUsuariosActivos = (cliente: any, io: any) => {
    cliente.on("obtener-usuarios-activos", () => {
        io.to(cliente.id).emit("usuarios-activos", usuarioDAO.obtenerUsuariosActivos());
    })
}

export const iniciarSesion =  (cliente:any,io:any)=>{
    cliente.on("iniciar-sesion",async (payload:any,callback:Function)=>{
        const nomUsuario = payload.nomUsuario;
        const clave = payload.clave;
        let usuario = await usuarioDAO.obtenerUsuarioPorNombreUsuario(nomUsuario);
        
        if (usuario?.length===0) {
            callback({
                flag: false,
                msg: "Usuario no existe"
            })    
            return "";
        }
        
        if (usuario[0].clave != clave) {
            callback({
                flag: false,
                msg: "Clave incorrecta"
            })    
            return "";
        }

        callback({
            flag: true,
            msg: "Credenciales correctas",
            listUsuario:usuario[0]
        })
    })
}

