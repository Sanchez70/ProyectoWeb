import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zHotel';
  
  constructor(private authService: AuthService) {
    this.authService.isLoggedIn = false;
    this.authService.tipoUser = '';
  }

  usuario(){
   return this.authService.tipoUser
  }

  footer(){
    this.authService.login
  }
}

