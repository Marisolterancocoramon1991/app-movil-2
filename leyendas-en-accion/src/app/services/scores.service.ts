import { Injectable } from '@angular/core';
import { Score } from '../models/score';
import { AuthFirebaseService } from './authFirebase.service';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  collectionName:string = 'scoresHeroes';
  constructor(private collections:CollectionsService,private auth:AuthFirebaseService) { }

  add(score:Score){  
    score.email = this.auth.userLogged.email;  
    return this.collections.addOne(this.collectionName,score);  
  }

  get(){
    return this.collections.getAllWhereTop<Score>(this.collectionName,'','',5,'score');
  
  }

}
