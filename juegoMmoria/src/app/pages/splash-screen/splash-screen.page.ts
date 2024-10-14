import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor() { }

  ngOnInit() {
    // Muestra el splash estático durante 3 segundos
    setTimeout(() => {
      // Oculta el splash estático
      const splashContainer = document.getElementById('splash-container');
      if (splashContainer) {
        splashContainer.style.display = 'none';
      }

      // Muestra el logo dinámico
      const dynamicLogoContainer = document.getElementById('dynamic-logo-container');
      if (dynamicLogoContainer) {
        dynamicLogoContainer.style.display = 'flex';
      }

      // Mueve el logo de izquierda a derecha
      const dynamicLogo = document.getElementById('dynamic-logo');
      if (dynamicLogo) {
        dynamicLogo.style.position = 'absolute';
        dynamicLogo.style.left = '-100%'; // Comienza fuera de la pantalla a la izquierda

        // Animación de movimiento
        setTimeout(() => {
          dynamicLogo.style.transition = 'left 2s ease'; // Transición de movimiento
          dynamicLogo.style.left = '50%'; // Mueve al centro
          dynamicLogo.style.transform = 'translateX(-50%)'; // Centra el logo

          // Agranda el logo
          setTimeout(() => {
            dynamicLogo.style.transition = 'transform 1s ease';
            dynamicLogo.style.transform = 'translate(-50%, -50%) scale(5)'; // Agranda el logo

            // Redirige a la ruta de inicio después de 1 segundo
            setTimeout(() => {
              window.location.href = '/login'; // Redirige a la página de inicio
            }, 1000);

          }, 2000); // Tiempo para que el logo esté en el centro antes de agrandar

        }, 0); // Tiempo para iniciar la animación de movimiento
      }

    }, 3000); // Muestra el splash estático por 3 segundos
  }
}

