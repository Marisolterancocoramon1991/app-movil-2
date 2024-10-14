import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InterceptorService } from 'src/app/servicees/interceptor.service';
import { ToastService } from 'src/app/servicees/toast.service';

import { UsuariosService } from 'src/app/servicees/usuarios.service';
import { User } from '../../interfaces/user';
import { AuthFirebaseService } from '../../servicees/auth-firebase.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  public user!: User;
  public selectedValue: string = "";
  volume:boolean = true;
  
  constructor(private router: Router,
    private auth: AuthFirebaseService,
    private interceptor: InterceptorService,
    private toastService: ToastService,
    private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.user = { uid: {}, email: {}, pass: {}, profile: {} } as User;
  }

  get mail() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  error: string = "";
  id: string = "";

  changeVol() {
    let sVol = localStorage.getItem('volume') as string;
    if (sVol == 'false') {
      localStorage.setItem('volume', 'true');
      this.volume = true;
    }
    else {
      localStorage.setItem('volume', 'false');
      this.volume = false;    
    }
  }

  limpiar() {
    this.loginForm.controls['email'].setValue('');
    this.loginForm.controls['password'].setValue('');
    this.error = '';
  }

  goToRegistro() {
    this.router.navigateByUrl("register");
  }

  goToHomeCliente() {
    this.router.navigateByUrl("/home/cliente");
  }

  completarCampos(id: number) {
    switch (id) {
      case 1:
        this.error = '';
        this.loginForm.controls['email'].setValue('admin@admin.com');
        this.loginForm.controls['password'].setValue('111111');
        break;
      case 2:
        this.error = '';
        this.loginForm.controls['email'].setValue('invitado@invitado.com');
        this.loginForm.controls['password'].setValue('222222');
        break;
      case 3:
        this.error = '';
        this.loginForm.controls['email'].setValue('usuario@usuario.com');
        this.loginForm.controls['password'].setValue('333333');
        break;      
    }
  }

  async login(form: FormGroup) {
    await Haptics.impact({ style: ImpactStyle.Light }); // Vibrar al iniciar sesión
    try {
      if (form.valid) {
        this.user.email = form.controls['email'].value;
        this.user.pass = form.controls['password'].value;

        this.interceptor.updateLoadingState(true); //activa el spinner

        await this.auth.login(this.user)
          .then(() => {
            this.interceptor.updateLoadingState(false);

            this.toastService.openSuccessToast('Inició sesión  exitosamente!', 'top');
            this.router.navigateByUrl('home');
          })
          .catch((error) => {
            console.log(error)
            this.usuariosService.findUsuario(this.user.email).then((x) => {
              this.interceptor.updateLoadingState(false);
              let estaRechazado: boolean = true;

              if (x != null && x.size > 0) {
                x.docs.forEach(element => {
                  if (element.data()['pending'] == "S") {
                    this.toastService.openWarningToast('Usuario con aprobación pendiente', 'top');
                    estaRechazado = false;
                  }
                });
                if(estaRechazado)
                  this.toastService.openErrorToast('Usuario rechazado', 'top');
              }
              else
                this.toastService.openErrorToast('Usuario o clave incorrecta', 'top');
            })
          })
      }
    }
    catch (err) {
      this.toastService.openErrorToast('No se pudo conectar al servidor', 'top');
    }
  }

  
}
