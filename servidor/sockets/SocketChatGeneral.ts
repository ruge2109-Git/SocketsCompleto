import { ChatGeneralDAO } from "../logica/ChatGeneralDAO"

export const chatGeneralDAO = new ChatGeneralDAO();

export const obtenerMensajesGenerales = (cliente: any, io: any)=>{
    cliente.on("obtener-mensajes-generales-bd",async ()=>{
        const mensajes = await chatGeneralDAO.obtenerTodosLosMensajes();
        io.to(cliente.id).emit("mensajes-generales", mensajes);
    })
}