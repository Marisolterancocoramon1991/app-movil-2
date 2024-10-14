import { ICollection } from "../interfaces/iCollection";

export class Credito implements ICollection{
    constructor(public id:string,
        public email:string,
        public codigos:string[] = []
        ){}
    
}

