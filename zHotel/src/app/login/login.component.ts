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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  public searchForm: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: LoginService) {
    this.searchForm = this.fb.group({
      usuario: [''],
      contraneusu: [''] // Este campo se relaciona con el nombre que deseas buscar
    });
  }


  onSubmit() {
    const usuario = this.searchForm.value.usuario;
    const contraneusu = this.searchForm.value.contraneusu;

    this.clienteService.buscarCliente(usuario).subscribe(
      (result) => {
        if (Array.isArray(result) && result.length > 0) {
          const clientesEncontrados = result as Cliente[];

          if (clientesEncontrados.some(cliente => cliente.contrasena === contraneusu)) {
            Swal.fire('Contraseña correcta', 'Habitaciones', 'success');
          } else {
            // La contraseña no coincide con ninguna en el array
            Swal.fire('Contraseña incorrecta', 'Habitaciones', 'error');
          }
        }
      },
      (error) => {
        Swal.fire('Cliente no encontrado', `No se encontraron clientes con el nombre ${usuario}`, 'error');
        console.error(error);
      }
    );
  }
}
