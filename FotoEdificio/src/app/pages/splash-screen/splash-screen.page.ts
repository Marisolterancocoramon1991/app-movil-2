import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  names: string[] = ['Kervin Briceño' ];
  listNames: string[] = ['Kervin Briceño'];
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('login'); 
    }, 5000);
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

}
