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
  tipoUser:any;


login() {

  this.isLoggedIn = true;
}

logout() {

  this.isLoggedIn = false;
}
}
