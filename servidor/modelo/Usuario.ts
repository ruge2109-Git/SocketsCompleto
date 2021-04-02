import { model, Schema, Model, Document } from 'mongoose';

export class UsuarioDTO {
    idSocket: string;
    identificacion: number;
    nombres: string;
    email: string;
    telefono: string;
    nomUsuario: string;
    clave: string;

    constructor(idSocket: string) {
        this.idSocket = idSocket;
        this.identificacion= 0;
        this.nombres= "";
        this.email= "";
        this.telefono= "";
        this.nomUsuario= "";
        this.clave= "";
    }
};

export interface UsuarioDTOBD extends Document {
    identificacion:string;
    nombres: string;
    email: string;
    telefono: string;
    nomUsuario: string;
    clave: string;
};

const usuarioSchema: Schema = new Schema({
    identificacion: { type: String, required: true },
    nombres: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    nomUsuario: { type: String, required: true },
    clave: { type: String, required: true }
});

export const usuarioBD: Model<UsuarioDTOBD> = model('usuarios', usuarioSchema);
