export class Gender {
    name?: string;
    idMorph?: number;
    typeMorph?: string;
    constructor(_names : string, _idMorph : number, _typeMorph : string){
        this.name = _names;
        this.idMorph = _idMorph;
        this.typeMorph = _typeMorph;
    }
}
