import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from '../habitaciones/habitaciones.service';
import { Habitaciones } from '../habitaciones/habitaciones';
import { categorias } from '../habitaciones/categorias';
import { ClienteService } from '../clientes/cliente.service';
import { PersonaService } from '../persona/persona.service';
import { ReservaService } from '../reservas/reserva.service';
import { Reserva } from '../reservas/reserva';
import { Cliente } from '../clientes/cliente';
import { Persona } from '../persona/persona';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
@Component({
  selector: 'app-form-panel-control',
  templateUrl: './form-panel-control.component.html',
  styleUrl: './form-panel-control.component.css'
})
export class FormPanelControlComponent implements OnInit {

  buscar: any = '';
  resultadosCombinados: any[] = [];
  habitaciones: Habitaciones = new Habitaciones();
  reservas: Reserva = new Reserva();

  constructor(private habitacionesService: HabitacionesService, private clienteService: ClienteService, private personaService: PersonaService,
    private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.bucarReserva();
  }



  bucarReserva() {
    this.reservaService.getReserva().subscribe(
      reservaInd => {
        const observables = reservaInd.map(reservaInfo => {
          return this.clienteService.getCliente(reservaInfo.idCliente).pipe(
            switchMap(clienteInf => {
              const clienteInfo = clienteInf;
              if (clienteInfo) {
                return this.personaService.getPersona(clienteInfo.cedula_persona).pipe(
                  map(personaInf => {
                    const personaInfor = personaInf;
                    if (personaInfor) {
                      return {
                        reservaInfo: reservaInfo,
                        clienteInfo: clienteInfo,
                        personaInfor: personaInfor
                      };
                    } else {
                      console.error(`No se encontró información de persona para la cédula ${clienteInfo.cedula_persona}`);
                      return null;
                    }
                  })
                );
              } else {
                console.error(`No se encontró información de cliente para el ID de cliente ${reservaInfo.idCliente}`);
                return of(null);
              }
            })
          );
        });

        forkJoin(observables).subscribe(results => {
          console.log(results); // Verifica si los resultados están llegando aquí
          this.resultadosCombinados = results.filter(result => result !== null);
        });
      }
    );
  }

  private processCombinedData(data: any[]) {
    this.resultadosCombinados = data;
  }

  cmabiarEstado(id: any) {
    this.reservas.estado = 'Disponible';
    this.reservas.idReserva = id;
    this.reservaService.update(this.reservas).subscribe(
      (response) => {
        // Verifica la estructura de la respuesta antes de intentar acceder a sus propiedades
        if (response && response.idHabitaciones) {
          this.habitaciones.idHabitaciones = response.idHabitaciones;
          this.habitaciones.estado = 'Disponible';
          this.habitacionesService.getHabitacionesid(response.idHabitaciones).subscribe(respuestaHabi => {
            this.habitaciones.idHabitaciones = respuestaHabi.idHabitaciones;
            this.habitaciones.estado = 'Disponible';
            this.habitaciones.descriphabi=respuestaHabi.descriphabi;
            this.habitaciones.foto = respuestaHabi.foto;
            this.habitaciones.nHabitacion = respuestaHabi.nHabitacion;
            this.habitaciones.nPiso= respuestaHabi.nPiso;
            this.habitaciones.precio= respuestaHabi.precio;
            this.habitacionesService.update(this.habitaciones).subscribe(
              (habitacionResponse) => {
                console.log('Estado de habitación cambiado correctamente');
              },
              (errorHabitacion) => {
                console.error('Error al actualizar estado de la habitación:', errorHabitacion);
              }
            );
          });

        } else {
          console.error('La respuesta no contiene la propiedad esperada.');
        }


      },
      (errorReserva) => {
        console.error('Error al actualizar estado de la reserva:', errorReserva);
      }
    );
  }

}
