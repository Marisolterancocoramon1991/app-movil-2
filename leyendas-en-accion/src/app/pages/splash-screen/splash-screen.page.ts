import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

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

    if (staticSplash && dynamicSplash && dynamicLogo) {
      // Ocultar el splash estático
      staticSplash.style.display = 'none';
      // Mostrar el splash dinámico
      dynamicSplash.style.display = 'flex';
      
      // Iniciar la animación circular
      setTimeout(() => {
        dynamicLogo.classList.add('grow-rotate');
      }, 3000); // Iniciar la rotación y crecimiento después del movimiento circular
    }

    // Redirigir al login después de que la animación termine
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 6000); // Redirige después de 6 segundos
  }
}
