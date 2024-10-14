import { Injectable } from '@angular/core';
import { Firestore, Timestamp, and, collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatList, ChatMessage } from '../classes/chat';
import { AuthFirebaseService } from './authFirebase.service';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private colChatMessages: string = "chatMessages";
  private colChat: string = "chats";

  constructor(private firestore: Firestore, private auth: AuthFirebaseService, private collections: CollectionsService) { }

  async createChat(mensaje: string, sala: string): Promise<string> {
    const user = this.auth.userLogged?.name;
    const chatRef = collection(this.firestore, this.colChat);
    const queryRef = query(chatRef, where('sala', '==', sala));

    const querySnapshot = await getDocs(queryRef);
    if (!querySnapshot.empty) {
      throw new Error('La conversación ya existe.');
    }

    const name = localStorage.getItem("email");
    if (!name) {
      throw new Error('No se encontró el nombre de usuario.');
    }

    const chatData = new ChatList("", sala, user!, { message: mensaje, date: Timestamp.now(), nameFrom: name, sala });
    const docRef = doc(chatRef);
    chatData.id = docRef.id;

    await setDoc(docRef, { ...chatData });
    await this.sendMessage(mensaje, sala);
    return docRef.id;
  }

  async updateLastMessage(message: string, sala: string): Promise<void> {
    const name = localStorage.getItem("email");
    if (!name) {
      throw new Error('No se encontró el nombre de usuario.');
    }

    const chat = await this.collections.getOneByValue<ChatList>(this.colChat, 'sala', sala);
    if (!chat) {
      // Si no existe el chat, crea uno nuevo
      await this.createChat(message, sala);
    } else {
      // Si existe, actualiza el último mensaje
      chat.lastMessage = { message, date: Timestamp.now(), nameFrom: name, sala };
      await this.collections.update('chats', chat);
    }
  }

  async sendMessage(message: string, sala?: string): Promise<void> {
    const userFrom = this.auth.userLogged.name;

    await this.updateLastMessage(message, sala!);
    const chatMessageData: ChatMessage = new ChatMessage("", message, userFrom, sala!, Timestamp.now());
    await this.collections.addOne(this.colChatMessages, chatMessageData);
  }

  getChatMessages(sala: string): Observable<ChatMessage[]> {
    const chatMessagesRef = collection(this.firestore, 'chatMessages');
    const queryRef = query(chatMessagesRef, where('sala', '==', sala), orderBy('date'));

    return new Observable(subscriber => {
      const unsubscribe = onSnapshot(queryRef, querySnapshot => {
        const chatMessages: ChatMessage[] = [];
        querySnapshot.forEach(doc => {
          const chatMessage = { ...doc.data() as ChatMessage };
          chatMessages.push(chatMessage);
        });
        subscriber.next(chatMessages);
      });

      return () => unsubscribe();
    });
  }

  async updateChat(id_session: string) {
    const query = and(where('idSession', '==', id_session));
    const chat = await this.collections.getFirstQuery<ChatList>('chats', query);
    if (chat) {
      chat.isOpen = false;
      await this.collections.update('chats', chat);
    }
  }
}
