import { Router, Request, Response } from 'express';
import Server from '../controlador/Server';
import { MarcadorDAO } from "../logica/MarcadorDAO";

const mapaRutas = Router();
const mapa = MarcadorDAO.obtenerInstancia;

mapaRutas.get("/mapa",async (req: Request, res: Response)=>{
    res.json(mapa.obtenerMarcadores());
})

export default mapaRutas;
