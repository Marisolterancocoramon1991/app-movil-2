import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Score } from 'src/app/models/score';
import { ScoresService } from 'src/app/services/scores.service';
import { InterceptorService } from '../../services/interceptor.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {

  constructor(private scores:ScoresService,private interceptor:InterceptorService,private router:Router) { }
  scoresArr:Score[] = []
  

  ngOnInit() {
    
    this.buscar();
  }

  buscar(){
    
    this.interceptor.updateOverlayState(true)
    this.scores.get().then(scores =>{
      this.scoresArr = scores;
      this.interceptor.updateOverlayState(false)
    })
  }

  irAJugar()
  {    
    this.router.navigateByUrl('home')
  }

}
