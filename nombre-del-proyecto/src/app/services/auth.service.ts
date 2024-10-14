import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }
  async register({email, password}: any)
  {
    return createUserWithEmailAndPassword(this.auth, email,password);
  }

  async login({email, password}: any): Promise<any> {
    try {
      const credencialUsuario = await signInWithEmailAndPassword(this.auth, email, password);
      return credencialUsuario.user;
    } catch (error) {    
      console.error('Error durante el inicio de sesión:', error);
      throw error;
    }
  }



}
