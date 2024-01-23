// panel-recepcion.component.ts

import { Component, OnInit } from '@angular/core';
import { ServicioComunicacionService } from '../servicio-comunicacion.service';
import { ServicioRecepcion } from './servicio-recepcion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-panel-recepcion',
  templateUrl: './panel-recepcion.component.html',
  styleUrls: ['./panel-recepcion.component.css']
})
export class PanelRecepcionComponent implements OnInit {
  habitaciones: any[] = [];  // Asegúrate de definir la estructura correcta de los datos de habitaciones
  opcionSeleccionada: string = '';
  idABuscar: number = 0;

  constructor(
    private servicioComunicacion: ServicioComunicacionService,
    private servicioRecepcion: ServicioRecepcion,

    
  ) { }

  ngOnInit(): void {
    this.servicioComunicacion.actualizarPanel$.subscribe(() => {
      console.log('Se recibió una notificación de actualización en Panel Recepción');
      this.mostrarHabitaciones(); // Cambiado a mostrarHabitaciones
    });
  }

  mostrarHabitaciones(): void {
    this.servicioRecepcion.getHabitaciones().subscribe(
      habitaciones => {
        console.log('Datos de habitaciones:', habitaciones);
        this.habitaciones = habitaciones;
        this.opcionSeleccionada = 'Habitaciones'; // Inicialmente establecer la opción seleccionada
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
            // Lógica después de eliminar la habitación
            console.log('Habitación eliminada con éxito');
            swalWithBootstrapButtons.fire({
              title: 'Borrado',
              text: 'La habitación fue borrada con éxito',
              icon: 'success',
            });
            // Recargar la lista después de eliminar
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
        this.opcionSeleccionada = 'Habitaciones'; // Inicialmente establecer la opción seleccionada
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
            console.log('Habitación encontrada:', habitacion);
          } else {
            console.log('No se encontró ninguna habitación con ese ID.');
            this.habitaciones = []; // Limpiar la lista en caso de no encontrar ninguna habitación
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


  

}
