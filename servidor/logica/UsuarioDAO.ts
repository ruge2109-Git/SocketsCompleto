import { UsuarioDTO, usuarioBD, UsuarioDTOBD } from "../modelo/Usuario";

export class UsuarioDAO {

    private listaActivos: UsuarioDTO[] = [];

    constructor() {
    }

    async agregarUsuario(usuario: UsuarioDTO) {
        try {
            const usuarioNuevo: UsuarioDTOBD = await usuarioBD.create({
                identificacion:usuario.identificacion,
                nombres: usuario.nombres,
                email:usuario.email,
                telefono: usuario.telefono,
                nomUsuario: usuario.nomUsuario,
                clave: usuario.clave
            });
            await usuarioNuevo.save();
            return usuario;
        } 
        catch (error) {
            console.log(error);
            return "NADA";    
        }
    }

    conectarUsuario(usuario:UsuarioDTO){
        this.listaActivos.push(usuario);
        return usuario;
    }

    actualizarUsuarios(usuarioNuevo: UsuarioDTO) {
        // this.lista.filter(usuario=>{
        //     if(usuario.idSocket === usuarioNuevo.idSocket){
        //         usuario = usuarioNuevo;
        //     }
        // })
    }

    async obtenerTodosLosUsuarios(){
        try {
            const productos = await usuarioBD.find();
            return productos;
        } 
        catch (error) {
            console.log(error);    
        }
    }

    async obtenerUsuarioPorNombreUsuario(nomUsuario:string){
        try {
            const productos = await usuarioBD.find({nomUsuario:nomUsuario})
            return productos;
        } 
        catch (error) {
            console.log(error);    
            return [];
        }
    }

    obtenerUsuariosActivos() {
        return this.listaActivos;
    }

}