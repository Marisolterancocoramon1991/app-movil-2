import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  names: string[] = ['Kervin Briceño'];
  listNames: string[] = ['4A'];

  // Agrega estas propiedades para manejar la visibilidad
  showLogo: boolean = false; 
  showDivision: boolean = false; 
  showAnimation: boolean = false; // Asegúrate de tener esta propiedad también

  constructor(private router: Router) { }

  ngOnInit() {
    this.showAnimation = true; // Comienza la animación
    this.showNames(); // Llama a la función para mostrar nombres y logo

    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 5000);
  }

  showNames() {
    // Muestra el nombre primero
    setTimeout(() => {
      this.listNames.push(this.names[0]); // Agrega el nombre a la lista
    }, 1000); // Espera 1 segundo para mostrar el nombre

    // Luego muestra el logo
    setTimeout(() => {
      this.showLogo = true; // Cambia a true para mostrar el logo
    }, 2000); // Espera 2 segundos antes de mostrar el logo

    // Finalmente muestra la división
    setTimeout(() => {
      this.showDivision = true; // Cambia a true para mostrar la división
    }, 3000); // Espera 3 segundos antes de mostrar la división
  }

  ionViewDidEnter() {
    SplashScreen.hide();
  }
}