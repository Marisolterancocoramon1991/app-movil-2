import { Timestamp } from "firebase/firestore";
import { ICollection } from "../interfaces/iCollection";

export class Score implements ICollection {

    constructor(public id: string,
        public email: string,
        public score: number,
        public personaje: number,
        public date: Timestamp) { }
}
