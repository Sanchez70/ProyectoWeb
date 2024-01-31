import { Component, OnInit } from '@angular/core';
import { Servicio2Service } from './servicio2.service';
import { Servicios2 } from './servicios2';
import { ServicioService } from '../servicios/servicio.service';
import { Servicio } from '../servicios/servicio';
import { Habitaciones } from '../habitaciones/habitaciones';
import { HabitacionesService } from '../habitaciones/habitaciones.service';

@Component({
  selector: 'app-servicios2',
  templateUrl: './servicios2.component.html',
})
export class Servicios2Component implements OnInit {

  public servicios2: Servicios2[] = [];
  public tipoServicios: Servicio[] = [];
  public habitaciones: Habitaciones[] = [];

  constructor(
    private servicio2service: Servicio2Service,
    private tipoServicioService: ServicioService,
    private habitacionesService: HabitacionesService
  ) {}

  ngOnInit(): void {
    this.cargarServicios2();
    this.cargarTipoServicios();
    this.cargarHabitaciones();
  }

  cargarServicios2(): void {
    this.servicio2service.getServicios2().subscribe(
      (servicios2) => {
        this.servicios2 = servicios2;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarTipoServicios(): void {
    this.tipoServicioService.getServicios().subscribe(
      (tipoServicios) => {
        this.tipoServicios = tipoServicios;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarHabitaciones(): void {
    this.habitacionesService.getHabitaciones().subscribe(
      (habitaciones) => {
        this.habitaciones = habitaciones;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerTipoServicio(idTipoServicio: number): string {
    const tipoServicio = this.tipoServicios.find(tipo => tipo.idTipo_servicio === idTipoServicio);
    return tipoServicio ? tipoServicio.titulo : '';
  }

  obtenerNumeroHabitacion(idHabitacion: number): number {
    const habitacion = this.habitaciones.find(h => h.idHabitaciones === idHabitacion);
    return habitacion ? habitacion.nHabitacion : 0;
  }

  cambiarEstado(servicio: Servicios2): void {
    // Verificar si el estado actual es 'Pendiente' antes de cambiarlo
    if (servicio.estado === 'Pendiente') {
      // Cambiar el estado a 'Realizado'
      servicio.estado = 'Realizado';
  
      // Aquí deberías llamar a tu servicio para actualizar el estado en la base de datos
      this.servicio2service.actualizarEstado(servicio.idServicio, 'Realizado').subscribe(
        () => {
          console.log('Estado actualizado exitosamente.');
          // Puedes realizar otras acciones después de actualizar el estado si es necesario
        },
        (error) => {
          console.error('Error al actualizar el estado:', error);
          // Puedes manejar el error de manera apropiada
        }
      );
    }
  }
  
}
