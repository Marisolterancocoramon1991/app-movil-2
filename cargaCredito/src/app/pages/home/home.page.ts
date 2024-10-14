import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Importa SweetAlert2

import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Subscription } from 'rxjs';
import { Credito } from 'src/app/classes/credito';
import { Person } from 'src/app/classes/user/person';
import { AuthFirebaseService } from 'src/app/services/authFirebase.service';
import { CreditosService } from 'src/app/services/creditos.service';
import { InterceptorService } from 'src/app/services/interceptor.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private auth: AuthFirebaseService,
    private usuariosService: UsuariosService,
    private creditosService: CreditosService,
    private router: Router,
    private interceptor: InterceptorService,
    private CollectionsService: CollectionsService
  ) { }

  error: string = '';
  nombre: string = '';
  creditos: number = 0;
  isSupported = false;
  barcodes: Barcode[] = [];
  usuario?: Person;
  subscription?: Subscription;
  subscription2?: Subscription;
  credito!: Credito;

  ngOnInit() {
    this.interceptor.updateOverlayState(true);
    this.creditosService.getCreditoByUser(this.auth.userLogged.email).subscribe((respuesta) => {
      console.log('codigoss', respuesta);
      this.interceptor.updateOverlayState(false);
      if (respuesta.length === 0) {
        this.credito = new Credito('', this.auth.userLogged.email, []);
      } else {
        this.credito = respuesta[0];
      }
      this.creditos = 0;
      this.credito.codigos.forEach(element => {
        if (element === '8c95def646b6127282ed50454b73240300dccabc') {
          this.creditos += 10;
        }
        if (element === 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ') {
          this.creditos += 50;
        }
        if (element === '2786f4877b9091dcad7f35751bfcf5d5ea712b2f') {
          this.creditos += 100;
        }
      });
    });

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        this.error = 'Error no identificado';
      });
  }

  async scan(): Promise<void> {
    try {
      const { barcodes } = await BarcodeScanner.scan();
      this.barcodes.push(...barcodes);
      
      if (barcodes.length > 0) {
        this.verificarCarga(barcodes[0].rawValue);
      } else {
        this.presentToast('No se detectaron códigos.', 'warning');
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      this.presentToast('Error al escanear, intenta de nuevo.', 'success');
    }
  }

  verificarCarga(code: string) {
    let count = 0;
    this.credito.codigos.forEach(element => {
      if (element === code) {
        count++;
      }
    });
    if (this.auth.getUserId() === 'admin@admin.com' && count > 1) {
      this.presentToast('Este código ya fue utilizado! ' + count, 'warning');
    } else if (this.auth.getUserId() !== 'admin@admin.com' && count > 0) {
      this.presentToast('Este código ya fue utilizado!', 'warning');
    } else {
      this.cargarCodigo(code);
    }
  }

  validarCodigo(codigo: string) {
    return codigo === "8c95def646b6127282ed50454b73240300dccabc" ||
           codigo === "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 " ||
           codigo === "2786f4877b9091dcad7f35751bfcf5d5ea712b2f";
  }

  cargarCodigo(code: string) {
    if (this.validarCodigo(code)) {
      this.credito.codigos.push(code);

      if (this.credito.id !== '') {
        this.creditosService.update(this.credito);
      } else {
        this.creditosService.add(this.credito);
      }

      this.presentToast('Código cargado correctamente!', 'success');
    } else {
      this.presentToast('Código inválido!', 'success');
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    await Swal.fire({
      title: 'Permiso denegado',
      text: 'Para cargar crédito, se necesitan permisos de la cámara.',
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  }

  async presentToast(text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question') {
    await Swal.fire({
      text: text,
      icon: icon,
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  delCreditos() {
    console.log('del');
    this.credito.codigos = [];
    this.creditosService.update(this.credito);
  }

  public toastButtons = [
    {
      text: 'Sí',
      role: 'delete',
      handler: () => {
        this.delCreditos();
      },
    },
    {
      text: 'No',
      role: 'cancel',
    },
  ];
  deleteCredito() {
    const id = this.auth.getUserId();
    // Validar que id no sea undefined y sea un string
    if (typeof id === 'string' && id.trim() !== '') {
      // Llamada al servicio para eliminar el crédito
      this.CollectionsService.deleteByEmail("creditos", id)
        .then(() => {
          console.log('Crédito eliminado exitosamente');
          // Aquí puedes agregar una notificación de éxito con Swal
          Swal.fire({
            heightAuto: false,
            title: 'Crédito eliminado',
            text: 'El crédito ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        })
        .catch((error) => {
          console.error('Error al eliminar crédito:', error);
          // Aquí puedes agregar una notificación de error con Swal
          Swal.fire({
            heightAuto: false,
            title: 'Error',
            text: 'Ocurrió un error al intentar eliminar el crédito.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        });
    } else {
      console.error('ID inválido');
      // Notificar al usuario que el ID es inválido
      Swal.fire({
        heightAuto: false,
        title: 'ID inválido',
        text: 'No se pudo eliminar el crédito porque el ID es inválido o no existe.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
  
  logaut()
  {
    this.router.navigateByUrl('login');
  }
  
}
