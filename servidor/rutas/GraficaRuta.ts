import { Router, Request, Response } from 'express';
import Server from '../controlador/Server';
import { GraficaDataDTO } from '../modelo/Grafica';

const graficaRutas = Router();
const graficaDTO = new GraficaDataDTO();

graficaRutas.get('/grafica', async (req: Request, res: Response) => {
    res.json(graficaDTO.obtenerDataGrafica());
});

graficaRutas.post('/grafica', async (req: Request, res: Response) => {
    const mes = req.body.mes;
    const valor = Number(req.body.valor);
    graficaDTO.incrementarValor(mes,valor);

    const server = Server.obtenerInstancia;
    server.io.emit('cambio-grafica',graficaDTO.obtenerDataGrafica());

    res.json(graficaDTO.obtenerDataGrafica());
});

export default graficaRutas;