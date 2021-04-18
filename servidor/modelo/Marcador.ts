export class MarcadorDTO{
    lugar:string;
    lat:string;
    lng:string;
    id:string;

    constructor(id:string,lugar:string,lat:string,lng:string) {
        this.id = id;
        this.lugar = lugar;
        this.lat = lat;
        this.lng = lng;
    }
}