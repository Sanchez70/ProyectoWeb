 
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-admin-login',
  templateUrl: './form-admin-login.component.html',
  styleUrl: './form-admin-login.component.css'
})
export class FormAdminLoginComponent {

  // Emitir un evento cuando se hace clic en el botón
  @Output() recargarHabitaciones = new EventEmitter<void>();
 
  constructor(private  inicio: AuthService, private router: Router){}
   apagar(){
    this.router.navigate(['./login']);
    this.inicio.logout()
  }


  // Método que se llama cuando se hace clic en el botón
  onClickRecargarHabitaciones(): void {
    // Emitir el evento para notificar al componente principal que debe recargar la información de las habitaciones
    this.recargarHabitaciones.emit();
  }
 
}
