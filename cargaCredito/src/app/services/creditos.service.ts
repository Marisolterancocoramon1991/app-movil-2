import { Injectable } from '@angular/core';
import { and, where } from '@angular/fire/firestore';
import { Credito } from '../classes/credito';
import { CollectionsService } from './collections.service';
import { Firestore, collection, doc, deleteDoc, query } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CreditosService {
  collectionName:string = 'creditos'

  constructor(private collections:CollectionsService) { }

  getCreditoByUser(email:string){
    let querys = [where('email', "==", email)]
    
    return this.collections.getAllWhereSnapshot<Credito>(this.collectionName,and(...querys),'email','asc');
  }

  add(credito:Credito){
    this.collections.addOne(this.collectionName,credito);
  }

  update(credito:Credito){
    this.collections.update(this.collectionName,credito);
  
  }

  
}
