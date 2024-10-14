import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import { DomController, GestureController, ToastController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';
import { TimerComponent } from 'src/app/components/timer/timer.component';
import { Score } from 'src/app/models/score';
import { AuthFirebaseService } from 'src/app/services/authFirebase.service';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit {
  gameStarted = false;
  characterX = 0;
  characterY = 0;
  timer: any;
  intervalo: any
  points:number | undefined
  movimientoY: boolean = false;
  movimientoX: boolean = false;
  velocidadY: number = 2
  velocidadX: number = 0 

  velocidad: number = 1

  motionListener?: PluginListenerHandle;

  personaje:number = 0

  @ViewChild(TimerComponent) timerComponent!: TimerComponent;

  ngOnInit() {
    this.personaje = parseInt(this.router.snapshot.paramMap.get('personaje')!);
  }

  constructor(private gestureCtrl: GestureController,
    private domCtrl: DomController,
    private router: ActivatedRoute,
    private auth:AuthFirebaseService,
    private scoreService:ScoresService,
    private toastController: ToastController
  ) { }

  startGame(franchise: string) {
    this.gameStarted = true;
    
    this.velocidadY= Math.random() * (5 - 2) + 2
    this.velocidadX = Math.random() * (5 - 2) + 2

    this.movimientoY = Math.random() * (5 - 2) + 2 > 2.5
    this.movimientoX = (Math.random() * (5 - 2) + 2) > 2.5


    this.characterX = window.innerWidth / 2 - 25;
    this.characterY = window.innerHeight / 2 - 25;

    // Inicia el movimiento del personaje
    this.iniciarSensor();
    this.startCharacterMovement();

    // Inicia el temporizador
    this.startTimer();

    // Puedes agregar lógica para cargar personajes de la franquicia seleccionada
    // y asignarlos al personaje actual.
  }

  startCharacterMovement() {
    this.intervalo = setInterval(() => {

      if (this.movimientoY) {
        this.characterY += this.velocidadY
      } else {
        this.characterY -= this.velocidadY
      }

      if (this.movimientoX) {
        this.characterX += this.velocidadX
      }
      else {
        this.characterX -= this.velocidadX
      }
    }, 10)
  }

  aumentarVelocidad() {
    this.velocidad += 0.5
  }

  disminuirvelocidad() {
    this.velocidad -= 0.5
  }

  intervalStarted = false
  startTimer() {    
    this.timerComponent.resetTimer();
    this.timerComponent.startTimer();
    
      this.timer = setInterval(() => {
        this.intervalStarted = true;
        console.log(this.velocidadY)
        console.log(this.velocidadX)
        // Verifica si el personaje ha tocado los márgenes de la pantalla
        if (
          this.characterX <= -10 ||
          this.characterY <= -5 ||
          this.characterX >= window.innerWidth-70 ||
          this.characterY >= window.innerHeight-110
        ) {
          this.gameOver();
        }
      }, 100);    
  }

  gameOver() {
    clearInterval(this.timer);
    clearInterval(this.intervalo)
    this.gameStarted = false;

    this.points = this.timerComponent.stopTimer()

    // Guardar los puntos en la base de datos
    this.savePointsToDatabase(this.points);
  }

  savePointsToDatabase(points: number) {
    if(points>0)
    {
      let score:Score = new Score('',this.auth.userLogged.email,points,this.personaje,Timestamp.now())
      this.scoreService.add(score).then(async ()=>{
        const alert = await this.toastController.create({          
          message: 'Su puntuación de '+ points + ' fué cargada con éxito.',         
          duration: 1500,
          color: 'success'
        });
        await alert.present();
      });
    }
  }

  betaInicial = 0
  gamaInicial = 0
  alphaInicial = 0
  betaActual = 0
  gamaActual = 0
  alphaActual = 0

  betaAnterior = 0
  gamaAnterior = 0


  async iniciarSensor() {
    // Comienza a escuchar los eventos del acelerómetro
    this.motionListener = await Motion.addListener('orientation', (data) => {
  
      if (this.betaInicial === 0) {
        this.betaInicial = data.beta;
        this.gamaInicial = data.gamma;
        this.alphaInicial = data.alpha;
      }
  
      const rotationBeta = data.beta;
      const rotationGamma = data.gamma;
  
      this.betaActual = rotationBeta;
      this.gamaActual = rotationGamma;
      this.alphaActual = data.alpha;
  
      this.movimientoY = rotationBeta > this.betaInicial;
      this.movimientoX = rotationGamma > this.gamaInicial;
  
      if (rotationBeta !== this.betaInicial) {
        this.velocidadY = Math.pow(Math.abs(rotationBeta - this.betaInicial) / 20, 1.2) + parseInt(this.timerComponent.getSeconds()) / 10;
        this.velocidadX = Math.pow(Math.abs(rotationGamma - this.gamaInicial) / 20, 1.2) + parseInt(this.timerComponent.getSeconds()) / 10;
      }
    });
  }
  

  async pedirPermiso() {
    await (DeviceMotionEvent as any).requestPermission();
  }
  detenerSensor() {
    // Detén la escucha del acelerómetro cuando el componente se destruye
    this.motionListener?.remove();
  }



}