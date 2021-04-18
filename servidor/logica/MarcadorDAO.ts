import { MarcadorDTO } from "../modelo/Marcador";

export class MarcadorDAO{
    private marcadores:MarcadorDTO[] = [];
    private static _instance:MarcadorDAO;

    constructor(){}

    obtenerMarcadores(){
        return this.marcadores;
    }

    agregarMarcador(marcador:MarcadorDTO){
        this.marcadores.push(marcador);
    }

    eliminarMarcador(idMarcador:string){
        this.marcadores = this.marcadores.filter(marcador => marcador.id !== idMarcador);
        return this.marcadores;
    }

    moverMarcador(marcador:MarcadorDTO){
        for(let i in this.marcadores){
            if (this.marcadores[i].id === marcador.id) {
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].lng = marcador.lng;
                break;
            }
        }
        return this.marcadores;
    }

    public static get obtenerInstancia() {
        return this._instance || (this._instance = new this());
    }
}