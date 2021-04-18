import { MarcadorDAO } from "../logica/MarcadorDAO";

const mapa = MarcadorDAO.obtenerInstancia;


export const marcadorNuevo = (cliente: any, io: any) => {
    cliente.on("marcador-nuevo", async (payload: any) => {
        mapa.agregarMarcador(payload);
        cliente.broadcast.emit("marcador-nuevo", payload);
    })
}

export const eliminarMarcador = (cliente: any, io: any) => {
    cliente.on("eliminar-marcador", async (payload: any) => {
        mapa.eliminarMarcador(payload.idMarcador);
        io.emit("eliminar-marcador", payload);
    })
}

export const moverMarcador = (cliente: any, io: any) => {
    cliente.on("mover-marcador", async (payload: any)=>{
        mapa.moverMarcador(payload);
        cliente.broadcast.emit("mover-marcador",payload);
    })
}