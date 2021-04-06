import { model, Schema, Model, Document } from 'mongoose';

export class UsuarioDTO {
    _id?:string;
    idSocket: string;
    nombres: string;
    email: string;
    telefono: string;
    nomUsuario: string;
    clave: string;
    __v?:string;

    constructor(idSocket: string) {
        this.idSocket = idSocket;
        this.nombres= "";
        this.email= "";
        this.telefono= "";
        this.nomUsuario= "";
        this.clave= "";
    }
};

export interface UsuarioDTOBD extends Document {
    nombres: string;
    email: string;
    telefono: string;
    nomUsuario: string;
    clave: string;
};

const usuarioSchema: Schema = new Schema({
    
    nombres: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    nomUsuario: { type: String, required: true },
    clave: { type: String, required: true },
    
});

export const usuarioBD: Model<UsuarioDTOBD> = model('usuarios', usuarioSchema);
