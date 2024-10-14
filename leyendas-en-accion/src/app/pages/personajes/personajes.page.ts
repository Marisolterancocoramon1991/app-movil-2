import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.page.html',
  styleUrls: ['./personajes.page.scss'],
})
export class PersonajesPage implements OnInit {

  constructor(private router:ActivatedRoute,private route:Router) { }

  franquicia!:string
  personajes:number[] = []


  ngOnInit() {
    this.franquicia = (this.router.snapshot.paramMap.get('franquicia')!);  
    this.mostrarPersonajes(this.franquicia)
  }



  mostrarPersonajes(franquicia: string) {
    this.personajes = []; // Limpiar la lista de personajes antes de agregar nuevos elementos

    let empieza: number;
    if (franquicia === 'dc') {
        empieza = 1; // DC personajes del 1 al 6
        for (let i = empieza; i <= 6; i++) {
            this.personajes.push(i);
        }
    } else {
        empieza = 7; // Marvel personajes del 7 al 12
        for (let i = empieza; i < empieza + 6; i++) {
            this.personajes.push(i);
        }
    }
}


  seleccionarPersonaje(personaje:number) {        
    this.route.navigate(['juego', {personaje: personaje}])    
  }

}
