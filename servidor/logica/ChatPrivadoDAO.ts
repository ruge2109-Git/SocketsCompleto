import { ChatPrivado,chatPrivadoBD, ChatPrivadoDTO } from './../modelo/ChatPrivado';

export class ChatPrivadoDAO{
    constructor() {
    }

    async agregarMensaje(mensaje:ChatPrivadoDTO) {
        try {
            const mensajeNuevo: ChatPrivado = await chatPrivadoBD.create({
                nomUsuario:mensaje.nomUsuario,
                mensaje: mensaje.mensaje,
                fechaMensaje:mensaje.fechaMensaje,
                nombres:mensaje.nombres,
                nomUsuarioEmisor:mensaje.nomUsuarioEmisor,
                nomUsuarioReceptor:mensaje.nomUsuarioReceptor
            });
            await mensajeNuevo.save();
            return mensajeNuevo;
        } 
        catch (error) {
            console.log(error);
            return "NADA";    
        }
    }

    async obtenerTodosLosMensajes(nomUsuarioEmisor:string,nomUsuarioReceptor:string){
        try {
            let rta:ChatPrivado[] = [];
            const mensajes1 = await chatPrivadoBD.find({nomUsuarioEmisor:nomUsuarioEmisor,nomUsuarioReceptor:nomUsuarioReceptor});
            const mensajes2 = await chatPrivadoBD.find({nomUsuarioEmisor:nomUsuarioReceptor,nomUsuarioReceptor:nomUsuarioEmisor});
            mensajes1.forEach(element => {
                rta.push(element);
            });    
            mensajes2.forEach(element=>{
                rta.push(element);
            })
        
            rta = rta.sort((n1,n2) => {
                if (n1.fechaMensaje > n2.fechaMensaje) {
                    return 1;
                }
            
                if (n1.fechaMensaje < n2.fechaMensaje) {
                    return -1;
                }
            
                return 0;
            });
 
            return rta;
        } 
        catch (error) {
            console.log(error);    
        }
    }
}