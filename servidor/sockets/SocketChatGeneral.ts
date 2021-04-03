import { ChatGeneralDAO } from "../logica/ChatGeneralDAO"
import { ChatGeneralDTO } from "../modelo/ChatGeneral";

export const chatGeneralDAO = new ChatGeneralDAO();

export const obtenerMensajesGenerales = (cliente: any, io: any)=>{
    cliente.on("obtener-mensajes-generales-bd",async ()=>{
        const mensajes = await chatGeneralDAO.obtenerTodosLosMensajes();
        io.to(cliente.id).emit("mensajes-generales", mensajes);
    })
}

export const enviarMensaje = (cliente: any, io: any) => {
    cliente.on("mensaje", async (payload: any) => {
        
        if (payload.general) {
            let chatGeneral = new ChatGeneralDTO(payload.nomUsuario,payload.mensaje,new Date(),payload.nombres);
            payload = await chatGeneralDAO.agregarMensaje(chatGeneral);
        }
        io.emit('mensaje-nuevo', payload);
    })
}