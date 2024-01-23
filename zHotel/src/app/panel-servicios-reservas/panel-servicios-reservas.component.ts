// panel-servicios-reservas.component.ts

import { Component, OnInit } from '@angular/core';
import { ServicioReservas } from './servicio-reservas.service';  // Asegúrate de importar el servicio correcto

@Component({
  selector: 'app-panel-servicios-reservas',
  templateUrl: './panel-servicios-reservas.component.html',
  styleUrls: ['./panel-servicios-reservas.component.css']
})
export class PanelServiciosReservasComponent implements OnInit {
  reservasPendientes: any[] = [];
  serviciosSolicitados: any[] = [];

  constructor(private servicioReservas: ServicioReservas) { }

  ngOnInit(): void {
    this.cargarInformacion();
  }

  cargarInformacion(): void {
    // Llamada a los servicios para obtener reservas pendientes y servicios solicitados
    // Aquí debes usar los métodos correspondientes de tu servicio
    this.servicioReservas.getReservasPendientes().subscribe(reservas => {
      this.reservasPendientes = reservas;
    });

    this.servicioReservas.getServiciosSolicitados().subscribe(servicios => {
      this.serviciosSolicitados = servicios;
    });
  }

  // Puedes implementar métodos adicionales para editar y eliminar reservas o servicios según necesidades
  editarReserva(reserva: any): void {
    // Lógica para editar reserva
  }

  eliminarReserva(reserva: any): void {
    // Lógica para eliminar reserva
  }

  editarServicio(servicio: any): void {
    // Lógica para editar servicio
  }

  eliminarServicio(servicio: any): void {
    // Lógica para eliminar servicio
  }
}
