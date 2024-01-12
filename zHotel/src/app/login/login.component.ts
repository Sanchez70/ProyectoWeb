import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service'; // Asegúrate de importar el servicio correcto
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  tipoUsuario: string = ''; // Asegúrate de tener la propiedad tipoUsuario

  constructor(private loginService: LoginService, private router: Router) {}

  login(): void {
    this.loginService.login(this.usuario, this.contrasena, this.tipoUsuario).subscribe(
      (response) => {
        if (response.autenticado) {
          switch (this.tipoUsuario) {
            case 'cliente':
              this.router.navigate(['/clientes']); // Cambia '/clientes' según tu ruta
              break;
            case 'recepcionista':
              // Navegar a la página correspondiente para recepcionista
              break;
            case 'administrador':
              // Navegar a la página correspondiente para administrador
              break;
            default:
              break;
          }
        } else {
          console.log('Autenticación fallida');
          Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
        }
      },
      (error) => {
        console.error('Error en la autenticación', error);
        Swal.fire('Error', 'Ocurrió un error en la autenticación', 'error');
      }
    );
  }
}
