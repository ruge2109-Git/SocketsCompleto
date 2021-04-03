import { ChatGeneral,chatGeneralBD, ChatGeneralDTO } from './../modelo/ChatGeneral';

export class ChatGeneralDAO{
    constructor() {
    }

    async agregarMensaje(mensaje:ChatGeneralDTO) {
        try {
            const mensajeNuevo: ChatGeneral = await chatGeneralBD.create({
                nomUsuario:mensaje.nomUsuario,
                mensaje: mensaje.mensaje,
                fechaMensaje:mensaje.fechaMensaje,
                nombres:mensaje.nombres
            });
            await mensajeNuevo.save();
            return mensajeNuevo;
        } 
        catch (error) {
            console.log(error);
            return "NADA";    
        }
    }

    async obtenerTodosLosMensajes(){
        try {
            const mensajes = await chatGeneralBD.find();
            return mensajes;
        } 
        catch (error) {
            console.log(error);    
        }
    }
}