import { model, Schema, Model, Document } from 'mongoose';

export class ChatGeneralDTO {
    nomUsuario: string;
    nombres: string;
    mensaje: string;
    fechaMensaje: Date;
    constructor(nomUsuario: string, mensaje: string, fechaMensaje: Date, nombres: string) {
        this.nomUsuario = nomUsuario;
        this.mensaje = mensaje;
        this.fechaMensaje = fechaMensaje;
        this.nombres = nombres;
    }
}

export interface ChatGeneral extends Document {
    nomUsuario: string;
    nombres: string;
    mensaje: string;
    fechaMensaje: Date;
};

const ChatGeneralSchema: Schema = new Schema({
    nomUsuario: { type: String, required: true },
    nombres: { type: String, required: true },
    mensaje: { type: String, required: true },
    fechaMensaje: { type: Date, required: true }
});

export const chatGeneralBD: Model<ChatGeneral> = model('chatgeneral', ChatGeneralSchema);
