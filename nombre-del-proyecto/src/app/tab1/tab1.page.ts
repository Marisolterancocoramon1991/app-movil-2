import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  formReg: FormGroup;
  showLoginForm: boolean = true;

  constructor(private navCtrl: NavController, private authService: AuthService) {
    // Inicialización del formulario
    this.formReg = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  // Cambiar entre formularios de Login y Registro
  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  // Método para registrar usuario
  registroUsuario() {
    this.authService.register(this.formReg.value)
      .then(() => {
        this.navCtrl.navigateRoot('/home');
      })
      .catch(error => console.log('Error en el registro:', error));
  }

  // Método para completar automáticamente los campos (Ingreso rápido)
  completeField() {
    this.formReg.patchValue({
      email: 'kervinstilver1991@gmail.com',
      password: '123456'
    });
  }

  // Método para iniciar sesión
  loginUsuario() {
    this.authService.login(this.formReg.value)
      .then(() => {
        alert("Ingreso: " + JSON.stringify(this.formReg.value));

      })
      .catch(error => console.log('Error en el login:', error));
  }
}
 
