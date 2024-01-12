import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  model: Login = new Login('', '', ''); // Instancia del modelo Login

  constructor(private loginService: LoginService) {}

  login(): void {
    // Utiliza this.model para acceder a los datos del formulario
    this.loginService.login(this.model.usuario, this.model.contrasena, this.model.tipoUsuario).subscribe(
      (response) => {
        // Lógica de manejo de la respuesta
      },
      (error) => {
        // Lógica de manejo de errores
      }
    );
  }
}
