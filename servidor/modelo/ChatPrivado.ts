import { model, Schema, Model, Document } from 'mongoose';

export class ChatPrivadoDTO {
    nomUsuario: string;
    nombres: string;
    mensaje: string;
    fechaMensaje: Date;
    nomUsuarioEmisor:string;
    nomUsuarioReceptor:string;

    constructor(nomUsuario: string, mensaje: string, fechaMensaje: Date, nombres: string,nomUsuarioEmisor:string,nomUsuarioReceptor:string) {
        this.nomUsuario = nomUsuario;
        this.mensaje = mensaje;
        this.fechaMensaje = fechaMensaje;
        this.nombres = nombres;
        this.nomUsuarioEmisor = nomUsuarioEmisor;
        this.nomUsuarioReceptor = nomUsuarioReceptor;
    }
}

export interface ChatPrivado extends Document {
    nomUsuario: string;
    nombres: string;
    mensaje: string;
    fechaMensaje: Date;
    nomUsuarioEmisor:string;
    nomUsuarioReceptor:string;
};

const ChatPrivadoSchema: Schema = new Schema({
    nomUsuario: { type: String, required: true },
    nombres: { type: String, required: true },
    mensaje: { type: String, required: true },
    fechaMensaje: { type: Date, required: true },
    nomUsuarioEmisor: { type: String, required: true },
    nomUsuarioReceptor: { type: String, required: true }
});

export const chatPrivadoBD: Model<ChatPrivado> = model('chatprivado', ChatPrivadoSchema);
