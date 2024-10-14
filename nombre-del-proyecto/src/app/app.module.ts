import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"recuexamen1","appId":"1:629874425653:web:ed9797471135e84315d67c","storageBucket":"recuexamen1.appspot.com","apiKey":"AIzaSyB1CrRoQwQS_03aTy8MjD1nMpP9ATBNt0Q","authDomain":"recuexamen1.firebaseapp.com","messagingSenderId":"629874425653"})), provideAuth(() => getAuth())],
  bootstrap: [AppComponent],
})
export class AppModule {}
