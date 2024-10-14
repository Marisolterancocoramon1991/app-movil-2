import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { INotification } from 'src/app/interfaces/iNotification';
import { AuthFirebaseService } from 'src/app/services/authFirebase.service';
import { ChatService } from 'src/app/services/chat.service';
import { PushNotificationsService } from 'src/app/services/push-notifications.service';
import { QrService } from 'src/app/services/qr.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ChatMessage } from '../../../classes/chat';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
})
export class ChatAreaComponent implements OnInit, OnDestroy {
  
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef; // Para el desplazamiento al final del chat
  @Input() sala: string = ''; // Sala de chat
  messagesSubscription: Subscription = new Subscription(); // Suscripción para mensajes
  messages: ChatMessage[] = []; // Arreglo de mensajes
  class = ''; // Clase para el estilo de los mensajes
  
  private chatMessagesSubscription!: Subscription; // Suscripción a mensajes de chat

  @Output() onGoToButtom: EventEmitter<void> = new EventEmitter(); // Evento para desplazamiento

  constructor(
    private auth: AuthFirebaseService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private qr: QrService,
    private push: PushNotificationsService,
    private usuariosService: UsuariosService
  ) {
    this.chatService.getChatMessages(this.sala);
  }

  ngOnDestroy(): void {
    // Desuscribirse de las suscripciones para evitar fugas de memoria
    this.messagesSubscription?.unsubscribe();
    this.chatMessagesSubscription?.unsubscribe();
    this.messages = [];
    this.qr.onMostrarEscanearQr.emit(true); // Emitir evento
  }

  ngOnInit(): void {
    // Manejadores de eventos para teclado
    window.addEventListener('keyboardDidShow', () => {
      setTimeout(() => this.scrollToBottom(), 0);
    });
    
    window.addEventListener('ionKeyboardDidShow', () => {
      setTimeout(() => this.scrollToBottom(), 0);
    });

    // Obtener la sala desde la ruta si no está definida
    if (this.sala === "") {
      this.sala = this.route.snapshot.paramMap.get('sala')!;           
    }

    // Establecer clase según la sala
    if (this.sala === 'PPS-4A') {
      this.class = 'a';
    } else {
      this.class = 'b';
    }

    // Obtener mensajes de chat
    this.getChatMessages(this.sala);
    this.qr.onMostrarEscanearQr.emit(false); // Emitir evento
  }

  get currentUser() {
    return this.auth.userLogged.name; // Obtener el nombre del usuario actual
  }

  getChatMessages(sala: string) {
    console.log('Sala:', sala);
    if (sala) { // Mejorar la verificación
      console.log("Entrando a la sala:", sala);
      this.chatMessagesSubscription = this.chatService.getChatMessages(sala).subscribe(
        data => {
          this.messages = data;
          console.log('Mensajes:', data);
          setTimeout(() => this.scrollToBottom(), 0);
        },
        error => {
          console.error("Error al obtener mensajes:", error);
        }
      );
    }
  }


  onSendMessage(message: string) {
    // Enviar mensaje
    this.chatService.sendMessage(message, this.sala);
    this.pushToMetres(message); // Notificaciones
  }

  async pushToMetres(message: string) {
    try {
      let myNotification: INotification = {
        title: "Mensaje de sala: " + this.sala,
        description: message
      };
      console.log(myNotification);

      // Obtener usuarios y procesar notificaciones
      this.usuariosService.getUsuarios().then(usuarios => {
        console.log(usuarios);
        usuarios.forEach(usuario => {
          // Lógica para enviar notificaciones a cada usuario
        });
      });
    } catch (e) {
      console.log('error push', e); // Manejo de errores
    }
  }

  getLeftRight(nameFrom: string, lado: string): boolean {
    // Determinar la alineación del mensaje
    if (lado === "right") {      
      return nameFrom === this.auth.userLogged.name;
    } else {
      return nameFrom !== this.auth.userLogged.name;
    }
  }

  scrollToBottom(): void {
    console.log('scrollToBottom');
    // Desplazarse al final del contenedor de mensajes
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    this.onGoToButtom.emit(); // Emitir evento para el desplazamiento
  }
}
