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

import { Administrador } from '../administrador/administrador';
import { Recepcionista } from '../recepcionista/recepcionista';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public searchForm: FormGroup;
  logeado: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private inicio: AppComponent,
   ) {
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
          const clienteEncontrado = clientesEncontrados.find(cliente => cliente.contrasena === contraneusu);
            if (clienteEncontrado) {
              // Asignar el idCliente al atributo usuario de AppComponent
              this.inicio.idUsuario = clienteEncontrado.idCliente;
              Swal.fire(`Bienvenid@ ${usuario}`, 'Inicio de sesion correcto', 'success');
              this.router.navigate(['./carrucel']);
              this.inicio.login();
              this.inicio.tipoUser='cliente';
              console.log(this.inicio.idUsuario)
          } else {
            // La contraseña no coincide con ninguna en el array
            Swal.fire('Contraseña o usuario incorrectos', 'Cliente', 'error');
          }
        }
      },
      (error) => {
        this.loginService.buscarAdmin(usuario).subscribe(
          (resultAdmin) => {
            if (Array.isArray(resultAdmin) && resultAdmin.length > 0) {
              const adminEcontrados = resultAdmin as Administrador[];
              if(adminEcontrados.some(admin=> admin.contrasena === contraneusu)){
                Swal.fire(`Bienvenid@ ${usuario}`, 'Inicio de sesion correcto', 'success');
                this.router.navigate(['./carrucel']);
                this.inicio.login();
                this.inicio.tipoUser='admin';
              }else {
                Swal.fire('Contraseña  incorrectos', 'Cliente', 'error');
              }

            }
          },
          (error) => {
            this.loginService.buscarRecep(usuario).subscribe(
              (resultRecep) => {
                if (Array.isArray(resultRecep) && resultRecep.length > 0) {
                  const recepEcontrados = resultRecep as Recepcionista[];
                  if(recepEcontrados.some(recep=> recep.contrasena === contraneusu)){
                    Swal.fire(`Bienvenid@ ${usuario}`, 'Inicio de sesion correcto', 'success');
                    this.router.navigate(['./carrucel']);
                    this.inicio.login();
                    this.inicio.tipoUser='recep';
                  }else {
                    Swal.fire('Contraseña  incorrectos', 'Cliente', 'error');
                  }
    
                }
              },
              (error) => {
                Swal.fire('Usuario incorrectos', 'Cliente', 'error');
              }
            );

          }
        );
      }
    );
  }

  redirectA() {
    // Puedes redirigir a la ruta deseada usando el router
    this.router.navigate(['/persona/form']);
 }
}
