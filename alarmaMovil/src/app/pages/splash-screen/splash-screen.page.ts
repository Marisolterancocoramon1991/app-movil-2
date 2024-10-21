import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  name = "Kervin Briceño";
  division = "4A";

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      const splashContainer = document.getElementById('splash-container');
      if (splashContainer) splashContainer.style.opacity = '0'; // Transición de desvanecimiento
  
      const dynamicLogo = document.getElementById('dynamic-logo-container');
      const nameDisplay = document.getElementById('name-display');
      const divisionDisplay = document.getElementById('division-display');
  
      setTimeout(() => {
        if (splashContainer) splashContainer.style.display = 'none'; // Oculta completamente después de la transición
        if (dynamicLogo) {
          dynamicLogo.style.display = 'flex'; // Muestra el logo dinámico
          dynamicLogo.style.opacity = '1'; // Aparece con una transición suave
  
          // Inserta el nombre y la división dinámicamente
          if (nameDisplay) nameDisplay.textContent = this.name;
          if (divisionDisplay) divisionDisplay.textContent = this.division;
  
          // Animación de vibración del logo
          setTimeout(() => {
            dynamicLogo.classList.add('vibrate'); // Clase para vibrar
            setTimeout(() => {
              this.router.navigate(['/login']); // Redirige después de la animación
            }, 3000); // 3 segundos para la redirección
          }, 4000); // 4 segundos para que empiece la vibración
        }
      }, 2000); // Tiempo para que termine la transición
    }, 3000); // 3 segundos de espera antes de iniciar la animación
  }
  
}
