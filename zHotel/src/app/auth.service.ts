import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  idUsuario: any;
  cedulaUser: any;
  tipoUser: any;
  idReserva: any;
  idEncabezado: any;
  idDetalle: any;
  idHabitacion: any;
  
  setCliente() {
    this.tipoUser = 'cliente';
  }

  setRecep() {
    this.tipoUser = 'recep';
  }

  setAdmin() {
    this.tipoUser = 'admin';
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
  isCliente(): boolean {
    return this.isLoggedIn && this.tipoUser === 'cliente';
  }

  isRecep(): boolean {
    return this.isLoggedIn && this.tipoUser === 'recep';
  }

  isAdmin(): boolean {
    return this.isLoggedIn && this.tipoUser === 'admin';
  }
}
