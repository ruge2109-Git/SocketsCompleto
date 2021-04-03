import { UsuarioDAO } from './../logica/UsuarioDAO';
import { ChatPrivadoDAO } from "../logica/ChatPrivadoDAO";
import { ChatPrivadoDTO } from "../modelo/ChatPrivado";

export const chatPrivadoDAO=new ChatPrivadoDAO();
export const usuarioDAO = UsuarioDAO.obtenerInstancia;

export const obtenerMensajesPrivados = (cliente: any, io: any)=>{
    cliente.on("obtener-mensajes-privados-bd",async (payload:any)=>{
        const mensajes = await chatPrivadoDAO.obtenerTodosLosMensajes(payload.nomUsuarioEmisor,payload.nomUsuarioReceptor);
        io.to(cliente.id).emit("mensajes-privados", mensajes);
    })
}

export const enviarMensaje = (cliente: any, io: any) => {
    cliente.on("mensaje-privado", async (payload: any) => {
        
        if (!payload.general) {
            let chatGeneral = new ChatPrivadoDTO(payload.nomUsuario,payload.mensaje,new Date(),payload.nombres,payload.nomUsuarioEmisor,payload.nomUsuarioReceptor);
            payload = await chatPrivadoDAO.agregarMensaje(chatGeneral);
            let usuarioReceptor = usuarioDAO.obtenerUsuarioActivoPorNomUsuario(payload.nomUsuarioReceptor);            
            if (usuarioReceptor.idSocket!="0") {
                console.log(usuarioDAO.obtenerUsuariosActivos());
                io.to(usuarioReceptor.idSocket).emit('mensaje-nuevo-privado', payload);
            }
        }
        
        io.to(cliente.id).emit('mensaje-nuevo-privado',payload);
    })
}