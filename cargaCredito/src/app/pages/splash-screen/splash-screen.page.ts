import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  showAnimation = false;

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.showAnimation = true; // Cambia al splash dinámico
    }, 4000); // Espera 2 segundos para ocultar el splash estático

    setTimeout(() => {
      this.router.navigateByUrl('login'); // Navega a la pantalla de login después
    }, 7000); // Después de 7 segundos en total
  }

  ionViewDidEnter() {
    SplashScreen.hide();
  }
}
