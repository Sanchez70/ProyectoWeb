import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recepcionista } from './recepcionista';
import { RecepcionistaService } from './recepcionista.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-recepcionista',
  templateUrl: './form-recepcionista.component.html',
})
export class FormRecepcionistaComponent implements OnInit {
  public recepcionista: Recepcionista = new Recepcionista();
  public titulo: string = 'Crear Recepcionista';

  constructor(
    private recepcionistaService: RecepcionistaService
  ) { }

  ngOnInit(): void {
    this.recepcionista.usuario = 'NombreUsuario';
    this.recepcionista.contrasena = 'ContrasenaSecreta';
  }

  create(): void {
    this.recepcionistaService.create(this.recepcionista).subscribe(
      (recepcionista) => {
        Swal.fire('Recepcionista guardado', `Recepcionista ${recepcionista.usuario} guardado con éxito`, 'success');
      },
      (error) => {
        //console.error('Error al crear el recepcionista', error);
        Swal.fire('Error', 'Hubo un error al crear el recepcionista', 'error');
      }
    );
  }


}
