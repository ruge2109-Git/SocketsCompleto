import { UsuarioDAO } from "../logica/UsuarioDAO";
import { UsuarioDTO } from "../modelo/Usuario";

export const usuarioDAO = new UsuarioDAO();


export const conectarUsuario = (cliente: any, io: any) => {
    let usuario = new UsuarioDTO(cliente.id);
    usuarioDAO.conectarUsuario(usuario);
}

export const actualizarUsuario = (cliente: any, io: any) => {
    cliente.on("actualizar-usuario", (payload: any, callback: Function) => {
        usuarioDAO.actualizarUsuarios(payload.usuario);
    })
}

export const obtenerUsuariosActivos = (cliente: any, io: any) => {
    cliente.on("obtener-usuarios-activos", () => {
        usuarioDAO.obtenerUsuariosActivos();
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
        })
    })
}