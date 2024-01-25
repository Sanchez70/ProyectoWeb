import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zHotel';
  isLoggedIn = false;
  idUsuario:any;
  cedulaUser:any;
  tipoUser:string='';

  setTipoUser(type: string): void {
    this.tipoUser = type;
  }

  getTipoUser(): string {
    return this.tipoUser;
  }


login() {

  this.isLoggedIn = true;
}

logout() {

  this.isLoggedIn = false;
}
}
