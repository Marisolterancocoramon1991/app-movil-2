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
  listNames: string[] = [];
  showAnimation = false;

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.showAnimation = true; // Muestra la animación del nombre y el logo
      this.showNames(); // Comienza a mostrar los nombres
    }, 2000); // Espera 2 segundos para mostrar el nombre y el logo

    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 7000); // Espera un total de 7 segundos antes de navegar
  }

  showNames() {
    this.names.forEach((name, index) => {
      setTimeout(() => {
        this.listNames.push(name);
      }, index * 1000);
    });
  }

  ionViewDidEnter() {
    SplashScreen.hide();
  }
}
