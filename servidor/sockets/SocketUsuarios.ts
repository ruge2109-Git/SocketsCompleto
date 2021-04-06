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

export const crearUsuario = (cliente:any, io:any) =>{
    cliente.on("crear-usuario-bd", async (payload:any,callback:Function)=>{
        
        let usuario = await usuarioDAO.obtenerUsuarioPorNombreUsuario(payload.nomUsuario);
        if (usuario?.length!=0) {
            callback({
                flag: false,
                msg: "Ya existe un usuario con ese nombre de usuario"
            })    
            return "";
        }

        let usuarioNuevo:UsuarioDTO = JSON.parse(JSON.stringify(payload));
        let agregarUsuario = await usuarioDAO.agregarUsuario(usuarioNuevo);
  
        callback({
            flag: true,
            msg: "Usuario agregado correctamente",
            usuario:agregarUsuario
        })
    })
}

export const modificarUsuarioBD = (cliente:any, io:any) =>{
    cliente.on("modificar-usuario-bd", async (payload:any,callback:Function)=>{
        
        let usuario = await usuarioDAO.obtenerUsuarioPorId(payload._id);
        
        if (usuario==null) {
            callback({
                flag: false,
                msg: "No existe un usuario con ese nombre de usuario"
            })    
            return "";
        }

        let usuario2 = await usuarioDAO.obtenerUsuarioPorNombreUsuario(payload.nomUsuario);
        if (usuario2?.length!=0 && usuario.nomUsuario != usuario2[0].nomUsuario) {
            callback({
                flag: false,
                msg: "Ya existe un usuario con ese nombre de usuario"
            })    
            return "";
        }

        let usuarioNuevo:UsuarioDTO = JSON.parse(JSON.stringify(payload));
        let usuarioModificado = await usuarioDAO.modificarUsuarioBD(usuarioNuevo);
  
        callback({
            flag: true,
            msg: "Usuario modficado correctamente",
            usuario:usuarioModificado
        })
    })
}

export const eliminarUsuarioBD = (cliente:any,io:any)=>{
    cliente.on("eliminar-usuario-bd",async (payload:any,callback:Function)=>{
        let usuario = await usuarioDAO.obtenerUsuarioPorId(payload._id);
        
        if (usuario==null) {
            callback({
                flag: false,
                msg: "No existe un usuario con ese nombre de usuario"
            })    
            return "";
        }
        let usuarioNuevo:UsuarioDTO = JSON.parse(JSON.stringify(payload));
        await usuarioDAO.eliminarUsuarioBD(usuarioNuevo);
        
        let usuarios = await usuarioDAO.obtenerTodosLosUsuarios();
        io.to(cliente.id).emit("usuarios-bd",usuarios);
  
        callback({
            flag: true,
            msg: "Usuario eliminado correctamente"
        })
    })
}

export const obtenerUsuariosBD = (cliente:any,io:any)=>{
    cliente.on("obtener-usuarios-bd",async ()=>{        
        let usuarios = await usuarioDAO.obtenerTodosLosUsuarios();
        io.to(cliente.id).emit("usuarios-bd",usuarios);
    })
}

export const obtenerUsuarioBDPorIdsuario = (cliente:any,io:any)=>{
    cliente.on("obtener-usuario-bd-por-id",async (payload:any,callback:Function)=>{
        const idUsuario = payload.idUsuario;
        
        let usuario = await usuarioDAO.obtenerUsuarioPorId(idUsuario);
        if (usuario==null ) {
            callback({
                flag: false,
                msg: "Usuario no existe"
            })    
            return "";
        }

        callback({
            flag: true,
            msg: "Usuario encontrado",
            listUsuario:usuario
        })
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

