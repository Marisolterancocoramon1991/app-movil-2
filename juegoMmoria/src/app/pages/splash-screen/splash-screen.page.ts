import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  
  name = "Kervin Briceño";
  division = "4A";
  
  constructor() { }

  ngOnInit() {
    // Muestra el splash estático durante 3 segundos
    setTimeout(() => {
      // Oculta el splash estático
      const splashContainer = document.getElementById('splash-container');
      if (splashContainer) {
        splashContainer.style.transition = 'opacity 1s ease'; // Transición suave
        splashContainer.style.opacity = '0'; // Desvanece el contenedor del splash

        // Una vez que el splash está oculto, muestra el logo dinámico
        setTimeout(() => {
          splashContainer.style.display = 'none'; // Asegura que no ocupe espacio
          
          // Muestra el logo dinámico
          const dynamicLogoContainer = document.getElementById('dynamic-logo-container');
          if (dynamicLogoContainer) {
            dynamicLogoContainer.style.display = 'flex';
            dynamicLogoContainer.style.opacity = '0'; // Inicialmente oculto
            dynamicLogoContainer.style.transition = 'opacity 1s ease'; // Transición suave

            // Desvanece el logo dinámico
            setTimeout(() => {
              dynamicLogoContainer.style.opacity = '1'; // Muestra el logo dinámico

              // Anima el nombre y la división
              const nameElement = document.getElementById('name');
              const divisionElement = document.getElementById('division');
              if (nameElement && divisionElement) {
                setTimeout(() => {
                  nameElement.style.opacity = '1';
                  nameElement.style.transform = 'translateY(0)';
                  divisionElement.style.opacity = '1';
                  divisionElement.style.transform = 'translateY(0)';
                }, 500); // Espera medio segundo antes de mostrar los textos

                // Redirige a la ruta de inicio después de 4 segundos
                setTimeout(() => {
                  // Desvanece todo antes de redirigir
                  dynamicLogoContainer.style.opacity = '0'; // Desvanece el logo y textos
                  setTimeout(() => {
                    window.location.href = '/login'; // Redirige a la página de inicio
                  }, 1000); // Espera un segundo para que el desvanecimiento sea visible
                }, 4000); // Espera 4 segundos antes de redirigir

              }
            }, 500); // Espera medio segundo para mostrar el logo dinámico
          }
        }, 1000); // Espera 1 segundo antes de mostrar el logo dinámico
      }

    }, 3000); // Muestra el splash estático por 3 segundos
  }
}
