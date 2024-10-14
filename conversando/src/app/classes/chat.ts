import { Timestamp } from '@angular/fire/firestore';
import { ICollection } from '../interfaces/iCollection';

export class ChatMessage implements ICollection {
    constructor(
        public id: string,        
        public message: string,
        public nameFrom: string,
        public sala: string,
        public date: Timestamp
    ) { }
}

export class ChatList implements ICollection {
    constructor(
        public id: string,
        public sala:string,        
        public user: string,
        public lastMessage: LastMessage,
        public isOpen:boolean=true
        ) { }

}
export interface LastMessage{
    message:string,date:Timestamp, nameFrom:string, sala:string
}