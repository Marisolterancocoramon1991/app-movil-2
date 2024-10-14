import { Component, OnDestroy, OnInit } from '@angular/core';
import { arrowRedoOutline } from 'ionicons/icons';

import { addIcons } from 'ionicons';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthFirebaseService } from '../services/auth-firebase.service';
import { PluginListenerHandle } from '@capacitor/core';
import { CapacitorFlash } from '@capgo/capacitor-flash';
import { Motion, MotionEventResult } from '@capacitor/motion';
import { Haptics } from '@capacitor/haptics';
import { User } from '../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
 
})
export class HomePage implements OnInit{
  private currentUser: User | undefined;

  private accelHandler: PluginListenerHandle | null = null;
  public audio: HTMLAudioElement = new Audio();
  private currentAction: string | null = null;
  public isDetectorActive = false;
  private lastTriggerCall: string = '';
  private timerId: any;

  constructor(public auth: AuthFirebaseService, public spinner: NgxSpinnerService) {
    addIcons({ arrowRedoOutline });
  }

  handleLogout() {
    this.stopListening();
    this.auth.logout();
  }

  ngOnInit(): void {
    
  }
  

  play(direction: string) {
    this.audio.pause();
    // Asegúrate de que estas rutas sean correctas y que los archivos existan
    this.audio = new Audio(`assets/sounds/${direction}.mp3`);
    this.audio.volume = 1;
    this.audio.play().catch((error) => {
      console.error('Error al reproducir el audio:', error);
    });
  }

  async toggleDetector() {
    if (this.isDetectorActive) {
      const { value: password } = await Swal.fire({
        title: '¡Por favor, introduzca su contraseña para desactivar la alarma!',
        input: 'password',
        inputPlaceholder: 'contraseña',
        showCancelButton: true,
        confirmButtonText: '¡Adelante!',
        cancelButtonText: '¡Detener!',
        heightAuto: false,
        customClass: {
          title: 'custom-alert-title',
          confirmButton: 'custom-alert-confirm-btn',
        },
        inputValidator: (value) => {
          if (!value) {
            return '¡Es imprescindible que ingrese su contraseña para continuar!';
          }
          return '';
        },
      });
      
      
      // Solo se ejecuta si el usuario ingresó una contraseña
      if (password) {
        if (password ===  localStorage.getItem('password')) {
          this.deactivateDetector();
        } else {
          this.triggerAlarm();
          Swal.fire({
            heightAuto: false,
            icon: 'error',
            title: '¡Ups! Contraseña Incorrecta',
            text: 'La contraseña que ingresaste no coincide. ¿Acaso estás intentando hacer algo sospechoso? ¡No lo intentes!',
            customClass: {
              title: 'custom-alert-title',
              confirmButton: 'custom-alert-confirm-btn',
            },
          });
          
        }
      }
    } else {
      this.activateDetector();
    }
  }

  activateDetector() {
    this.isDetectorActive = true;
    try {
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        (DeviceMotionEvent as any)
          .requestPermission()
          .then((permission: any) => {
            if (permission === 'granted') {
              this.startListening();
            } else {
              console.error('Permission not granted');
            }
          });
      } else {
        this.startListening();
      }
    } catch (e) {
      console.error('Permission denied or error occurred:', e);
    }
  }

  startListening() {
    Motion.addListener('accel', (event: MotionEventResult) => {
      this.handleMotion(event);
    }).then((handler) => {
      this.accelHandler = handler;
    });
  }

  deactivateDetector() {
    this.isDetectorActive = false;
    this.lastTriggerCall = '';
    this.stopListening();
  }
  betaInicial = 0
  gamaInicial = 0
  alphaInicial = 0
  betaActual = 0
  gamaActual = 0
  alphaActual = 0

  betaAnterior = 0
  gamaAnterior = 0
 
  volvio = true;
  levanto = true;
  indiceActual = 0
  ultimoCambio = new Date().getTime();

 



  handleMotion(event: MotionEventResult) {
    const { x, y, z } = event.accelerationIncludingGravity;
    if (Math.abs(y) > Math.abs(x)) {
      if (y > 5 && this.currentAction !== 'vertical') {
        this.currentAction = 'vertical';
        this.triggerVerticalAction();
      }
    } else if (Math.abs(z) > 5 && this.currentAction !== 'horizontal') {
      this.currentAction = 'horizontal';
      this.triggerHorizontalAction();
    } else {
      if (x > 5 && this.currentAction !== 'right') {
        this.currentAction = 'right';
        this.triggerRightAction();
      } else if (x < -5 && this.currentAction !== 'left') {
        this.currentAction = 'left';
        this.triggerLeftAction();
      }
    }
  }

  triggerLeftAction() {
    if (this.lastTriggerCall !== 'left') {
      clearTimeout(this.timerId);
      this.lastTriggerCall = 'left';
      this.play('left');
      this.currentAction = null;
    }
  }

  triggerRightAction() {
    if (this.lastTriggerCall !== 'right') {
      clearTimeout(this.timerId);
      this.lastTriggerCall = 'right';
      this.play('right');
      this.currentAction = null;
    }
  }

  triggerVerticalAction() {
    if (this.lastTriggerCall !== 'vertical') {
      clearTimeout(this.timerId);
      this.lastTriggerCall = 'vertical';
      this.play('vertical');
      CapacitorFlash.switchOn({ intensity: 1 }).then(
        () =>
          (this.timerId = setTimeout(() => {
            CapacitorFlash.switchOff();
            this.currentAction = null;
          }, 5000))
      );
    }
  }

  triggerHorizontalAction() {
    if (this.lastTriggerCall !== 'horizontal') {
      clearTimeout(this.timerId);
      this.lastTriggerCall = 'horizontal';
      this.play('horizontal');
      Haptics.vibrate({ duration: 5000 }).then(() => {
        this.timerId = setTimeout(() => {
          this.currentAction = null;
        }, 5000);
      });
    }
  }

  triggerAlarm() {
    this.lastTriggerCall = 'alarm';
    this.play('alarm');
    Haptics.vibrate({ duration: 5000 });
    CapacitorFlash.switchOn({ intensity: 1 }).then(() =>
      setTimeout(() => {
        CapacitorFlash.switchOff();
        this.audio.pause();
      }, 5000)
    );
  }

  stopListening() {
    if (this.accelHandler) {
      this.accelHandler.remove();
      this.accelHandler = null;
    }
    this.currentAction = null;
    this.lastTriggerCall = '';
  }

  ngOnDestroy() {
    this.stopListening();
    Motion.removeAllListeners();
    clearTimeout(this.timerId);
  }
}
