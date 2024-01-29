 // form-recepcionista.component.ts
import { Component, OnInit } from '@angular/core';
import { Recepcionista } from './recepcionista';
import { RecepcionistaService } from './recepcionista.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-form-recepcionista',
  templateUrl: './form-recepcionista.component.html',
})
export class FormRecepcionistaComponent implements OnInit {
  public recepcionista: Recepcionista = new Recepcionista();
  public titulo: string = 'Crear Recepcionista';
  

  constructor(private recepcionistaService: RecepcionistaService, private router1: Router, private activateRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    // Puedes agregar lógica de inicialización si es necesario
  }

  cargarRecepcionista(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        // Asegúrate de que tu servicio tenga un método getRecepcionistaid(id) o similar
        this.recepcionistaService.getRecepcionista(id).subscribe((recepcionista) => {
          this.recepcionista = recepcionista;
        });
      }
    });
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
