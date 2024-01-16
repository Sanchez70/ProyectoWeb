import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { Cliente } from '../clientes/cliente';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.login(this.usuario, this.password).subscribe(
      (cliente) => {
        if (cliente) {
          this.router.navigate(['./carrucel']);
          this.showSuccessAlert(cliente);
        } else {
          this.showErrorAlert('Usuario o contraseña incorrectos');
        }
      },
      (error) => {
        console.error(error);
  
        // Verificar si el error tiene un mensaje específico del backend
        if (error.error && error.error.message) {
          this.showErrorAlert(error.error.message);
        } else {
          this.showErrorAlert('Error desconocido'); // Mensaje genérico en caso de no haber mensaje específico
        }
      }
    );
  }
  
  showErrorAlert(errorMessage: string) {
    Swal.fire('Inicio de Sesión Fallido', errorMessage, 'error');
  }
  
  
  

  showSuccessAlert(cliente: Cliente) {
    // Utiliza la información del cliente según tus necesidades
    Swal.fire(`Bienvenido ${cliente.usuario}`, 'Inicio de Sesión Exitoso', 'success');
  }
}
