// panel-recepcion.component.ts

import { Component, OnInit } from '@angular/core';
import { ServicioComunicacionService } from '../servicio-comunicacion.service';
import { ServicioRecepcion } from './servicio-recepcion.service';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-panel-recepcion',
  templateUrl: './panel-recepcion.component.html',
  styleUrls: ['./panel-recepcion.component.css']
})
export class PanelRecepcionComponent implements OnInit {
  habitaciones: any[] = [];
  opcionSeleccionada: string = '';
  idABuscar: number = 0;
  mostrarTabla = false;

  constructor(
    private servicioComunicacion: ServicioComunicacionService,
    private servicioRecepcion: ServicioRecepcion
  ) { }

  ngOnInit(): void {
    this.servicioComunicacion.actualizarPanel$.subscribe(() => {
      console.log('Se recibió una notificación de actualización en Panel Recepción');
      this.mostrarHabitaciones();
    });
  }

  mostrarHabitaciones(): void {
    this.servicioRecepcion.getHabitaciones().subscribe(
      habitaciones => {
        console.log('Datos de habitaciones:', habitaciones);
        this.habitaciones = habitaciones;
        this.opcionSeleccionada = 'Habitaciones';
      },
      error => {
        console.error('Error al obtener habitaciones:', error);
      }
    );
  }

  eliminarHabitacion(id: number): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: 'No se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonAriaLabel: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioRecepcion.eliminarHabitacion(id).subscribe(
          () => {
            console.log('Habitación eliminada con éxito');
            swalWithBootstrapButtons.fire({
              title: 'Borrado',
              text: 'La habitación fue borrada con éxito',
              icon: 'success',
            });
            this.cargarInformacion();
          },
          (error) => {
            console.error('Error al eliminar la habitación', error);
            swalWithBootstrapButtons.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al eliminar la habitación',
              icon: 'error',
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelado',
          text: 'Has cancelado la operación',
          icon: 'error',
        });
      }
    });
  }

  cargarInformacion(): void {
    this.servicioRecepcion.getHabitaciones().subscribe(
      (habitaciones: any[]) => {
        this.habitaciones = habitaciones;
        this.opcionSeleccionada = 'Habitaciones';
        this.mostrarTabla = true;
      },
      error => {
        console.error('Error al cargar las habitaciones:', error);
      }
    );
  }

  buscarPorId(): void {
    if (this.idABuscar) {
      this.servicioRecepcion.getHabitacionById(this.idABuscar).subscribe(
        (habitacion) => {
          if (habitacion) {
            this.habitaciones = [habitacion];
            console.log('Habitación encontrada por ID:', habitacion);
          } else {
            console.log('No se encontró ninguna habitación con ese ID.');
            this.habitaciones = [];
          }
        },
        (error) => {
          console.error('Error al buscar habitación por ID:', error);
        }
      );
    } else {
      console.warn('Ingrese un ID antes de buscar.');
    }
  }

  buscarEnTiempoReal(): void {
    if (this.idABuscar) {
      this.servicioRecepcion.getHabitacionById(this.idABuscar).subscribe(
        (habitacion) => {
          if (habitacion) {
            this.habitaciones = [habitacion];
            console.log('Habitación encontrada por ID:', habitacion);
          } else {
            this.servicioRecepcion.buscarHabitacion(this.idABuscar.toString()).subscribe(
              (habitaciones) => {
                this.habitaciones = habitaciones;
                console.log('Habitaciones encontradas por número:', habitaciones);
              },
              (error) => {
                console.error('Error al buscar habitación por número:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error al buscar habitación por ID:', error);
        }
      );
    } else {
      console.warn('Ingrese un ID antes de buscar.');
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Backspace' && this.idABuscar.toString().length === 1) {
      this.idABuscar = 0;
      this.cargarInformacion();
    }
  }

  verificarOcupacionGeneral(): void {
    Swal.fire({
      title: 'Verificando Ocupación General',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      Swal.close();

      const ocupacion = Math.floor(Math.random() * 101);
      Swal.fire({
        title: 'Ocupación General',
        text: `La ocupación general es del ${ocupacion}%.`,
        icon: 'info',
      });
    }, 2000);
  }
}
