// form-recepcionista.component.ts
import { Component, OnInit } from '@angular/core';
import { Recepcionista } from './recepcionista';
import { RecepcionistaService } from './recepcionista.service';
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
  ) {}

  ngOnInit(): void {
    // Puedes agregar lógica de inicialización si es necesario
  }

  create(): void {
    this.recepcionistaService.create(this.recepcionista).subscribe(
      (recepcionista) => {
        // Puedes agregar lógica después de la creación del recepcionista
        Swal.fire('Recepcionista guardado', `Recepcionista ${recepcionista.usuario} guardado con éxito`, 'success');
      },
      (error) => {
        console.error('Error al crear el recepcionista', error);
        Swal.fire('Error', 'Hubo un error al crear el recepcionista', 'error');
      }
    );
  }
}
