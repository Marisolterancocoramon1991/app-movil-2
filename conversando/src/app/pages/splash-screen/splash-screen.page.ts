import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  names: string[] = ['Kervin Briceño']; // Nombres que quieres mostrar
  listNames: string[] = ['4a']; // Inicializa con uno para la primera animación
  showAnimation: boolean = false; // Controla cuándo se muestra la animación

  constructor(private router: Router) {}

  ngOnInit() {
    // Mostrar la pantalla estática durante 3 segundos
    setTimeout(() => {
      this.showAnimation = true; // Muestra el logo y empieza la animación
      this.showNames(); // Inicia la animación de los nombres
    }, 3000); // 3 segundos para la pantalla estática

    // Redirigir al login después de que todas las animaciones hayan terminado (por ejemplo, 6 segundos)
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 8000); // Duración total de las animaciones
  }

  showNames() {
    // Animar los nombres después de mostrar el logo
    this.names.forEach((name, index) => {
      setTimeout(() => {
        this.listNames.push(name); // Añadir cada nombre después de un intervalo
      }, index * 1000); // Intervalo de 1 segundo entre cada nombre
    });
  }

  ionViewDidEnter() {
    SplashScreen.hide(); // Ocultar el splash screen nativo de Capacitor
  }
}
