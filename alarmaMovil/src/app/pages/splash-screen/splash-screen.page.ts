import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Oculta el splash estático después de 2 segundos
    setTimeout(() => {
      const splashContainer = document.getElementById('splash-container');
      if (splashContainer) splashContainer.style.display = 'none'; // Oculta el splash estático

      const dynamicLogo = document.getElementById('dynamic-logo-container');
      if (dynamicLogo) {
        dynamicLogo.style.display = 'flex'; // Muestra el logo dinámico

        // Cambia de rojo a amarillo después de que el logo suba
        setTimeout(() => {
          dynamicLogo.classList.add('vibrate'); // Agrega la clase de vibración y cambia el fondo a amarillo
          
          // Redirige a la ruta de login 2 segundos después de que comience la vibración
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirige a la ruta login
          }, 3000); // 2 segundos después de que el logo vibre

        }, 4000); // 1 segundo para que comience la vibración
      }
    }, 3000); // 2 segundos de espera antes de iniciar la animación
  }

}
