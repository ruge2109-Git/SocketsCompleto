import { model, Schema, Model, Document } from 'mongoose';

export class ChatGeneralDTO{
    nomUsuario:string;
    mensaje:string;
    constructor(nomUsuario:string,mensaje:string){
        this.nomUsuario = nomUsuario;
        this.mensaje = mensaje;
    }
}

export interface ChatGeneral extends Document {
    nomUsuario:string;
    mensaje:string;
};

const ChatGeneralSchema: Schema = new Schema({
    nomUsuario: { type: String, required: true },
    mensaje: { type: String, required: true }
});

export const chatGeneralBD: Model<ChatGeneral> = model('chatgeneral', ChatGeneralSchema);
