import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public searchForm: FormGroup;
  logeado:Boolean =false;
  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService,
    private router: Router,
    private inicio:AppComponent,
    private userService:UserService) {
    this.searchForm = this.fb.group({
      usuario: [''],
      contraneusu: [''] // Este campo se relaciona con el nombre que deseas buscar
    });
  }


  onSubmit() {
    
    const usuario = this.searchForm.value.usuario;
    const contraneusu = this.searchForm.value.contraneusu;
//hola
    this.loginService.buscarCliente(usuario).subscribe(
      (result) => {
        if (Array.isArray(result) && result.length > 0) {
          const clientesEncontrados = result as Cliente[];
          if (clientesEncontrados.some(cliente => cliente.contrasena === contraneusu)) {
            Swal.fire(`Bienvenid@ ${usuario}`, 'Inicio de sesion correcto', 'success');
            this.userService.setUser(clientesEncontrados.find(cliente => cliente.contrasena === contraneusu));
            this.router.navigate(['./carrucel']);
            this.inicio.login();
          } else {
            // La contraseña no coincide con ninguna en el array
            Swal.fire('Contraseña o usuario incorrectos', 'Cliente', 'error');
          }
        }
      },
      (error) => {
        Swal.fire('Usuario Invalido', `No se encontro el usuario ${usuario}`, 'error');
        console.error(error);
      }
    );
  }
}
