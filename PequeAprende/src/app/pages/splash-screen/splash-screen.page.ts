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
  listNames: string[] = ['Kervin Briceño'];

  constructor(private router: Router) { }

  ngOnInit() {
    // Muestra el splash screen estático por 2 segundos
    setTimeout(() => {
      this.showNames(); // Llama a la función para mostrar los nombres
      this.showBubbles(); // Llama a la función para mostrar las burbujas
    }, 2000);

    setTimeout(() => {
      this.router.navigateByUrl('login'); 
    }, 5000); // Aumentar el tiempo para que el logo dinámico se vea después del estático
  }

  showNames() {
    setTimeout(() => {
      this.names.forEach((name, index) => {
        setTimeout(() => {
          this.listNames.push(name);
        }, index * 1000);
      });
    }, 1000);
  }

  ionViewDidEnter() {
    SplashScreen.hide();
  }

  showBubbles() {
    const splashContainer = document.getElementById('splash-container');
    const dynamicLogoContainer = document.getElementById('dynamic-logo-container');
    if (splashContainer) {
      splashContainer.classList.add('fade-out'); // Añade una clase para desvanecer el contenedor
      setTimeout(() => {
        splashContainer.style.display = 'none'; // Oculta el logo estático después del desvanecimiento
        if (dynamicLogoContainer) {
          dynamicLogoContainer.style.display = 'flex'; // Muestra el logo dinámico
        }
      }, 1000); // Espera el tiempo de la animación de desvanecimiento
    }
  }
}
