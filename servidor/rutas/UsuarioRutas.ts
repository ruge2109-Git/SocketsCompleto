import { Router, Request, Response } from 'express';
import { UsuarioDAO } from '../logica/UsuarioDAO';
import { UsuarioDTO } from '../modelo/Usuario';
const usuarioRutas = Router();
const usuarioDAO = new UsuarioDAO();

usuarioRutas.get('/usuario', async (req: Request, res: Response) => {
    try{
        let usuarios = await usuarioDAO.obtenerTodosLosUsuarios();
        
        res.json({
            flag: true,
            msg: "Lista de usuarios encontrada",
            usuario:usuarios
        })
    }
    catch(e){
        console.log(e);
        res.json({
            flag: true,
            msg: "Ha ocurrido un error inesperado"
        })
    }
});

usuarioRutas.post('/usuario/login', async (req: Request, res: Response) => {

    try{
        const nomUsuario = req.body.nomUsuario;
        const clave = req.body.clave;
        let usuario = await usuarioDAO.obtenerUsuarioPorNombreUsuario(nomUsuario);
        
        if (usuario?.length===0) {
            res.json({
                flag: false,
                msg: "Usuario no existe"
            })    
            return "";
        }
        
        if (usuario[0].clave != clave) {
            res.json({
                flag: false,
                msg: "Clave incorrecta"
            })    
            return "";
        }

        res.json({
            flag: true,
            msg: "Credenciales correctas",
        })
    }
    catch(e){
        console.log(e);
        res.json({
            flag: true,
            msg: "Ha ocurrido un error inesperado"
        })
    }
    
});
usuarioRutas.post('/usuario', async (req: Request, res: Response) => {

    try{
        let usuarioNuevo:UsuarioDTO = JSON.parse(JSON.stringify(req.body));
        let agregarUsuario = await usuarioDAO.agregarUsuario(usuarioNuevo);
        console.log(agregarUsuario);
        
        res.json({
            flag: true,
            msg: "Usuario agregado correctamente",
            usuario:agregarUsuario
        })
    }
    catch(e){
        console.log(e);
        res.json({
            flag: true,
            msg: "Ha ocurrido un error inesperado"
        })
    }
    
});

export default usuarioRutas;