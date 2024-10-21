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

  constructor(private router: Router) {}

  ngOnInit() {
    // Mostrar el splash estático durante 3 segundos
    setTimeout(() => {
      this.showDynamicSplash();
    }, 3000); // Cambia a splash dinámico después de 3 segundos
  }

  showDynamicSplash() {
    const staticSplash = document.getElementById('splash-container');
    const dynamicSplash = document.getElementById('dynamic-logo-container');
    const dynamicLogo = document.getElementById('dynamic-logo');
    const nameElement = document.getElementById('name');
    const divisionElement = document.getElementById('division');

    if (staticSplash && dynamicSplash && dynamicLogo && nameElement && divisionElement) {
      // Ocultar el splash estático con un desvanecimiento suave
      staticSplash.classList.add('fade-out');

      setTimeout(() => {
        staticSplash.style.display = 'none';
        dynamicSplash.style.display = 'flex';
        dynamicLogo.classList.add('move-in-circle');

        // Mostrar el nombre y la división con un desvanecimiento suave
        setTimeout(() => {
          nameElement.style.opacity = '1';
          nameElement.classList.add('fade-in');
          divisionElement.style.opacity = '1';
          divisionElement.classList.add('fade-in');
        }, 500); // Desvanecer texto después de mostrar el logo
      }, 1500); // Tiempo para el desvanecimiento

      // Redirigir al login después de que la animación termine
      setTimeout(() => {
        // Desvanecer el splash dinámico antes de redirigir
        dynamicSplash.classList.add('fade-out');
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, 1000); // Espera a que se desvanezca antes de redirigir
      }, 6000); // Redirige después de 6 segundos
    }
  }
}
