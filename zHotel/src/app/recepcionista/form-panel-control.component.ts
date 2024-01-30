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

@Component({
  selector: 'app-form-panel-control',
  templateUrl: './form-panel-control.component.html',
  styleUrl: './form-panel-control.component.css'
})
export class FormPanelControlComponent implements OnInit{

  habitaciones: Habitaciones = new Habitaciones();
  resevaHisto: Reserva[]=[ ];
  Categoria: categorias= new categorias();
  clientesEncontrado: Cliente= new Cliente();
  clientesResult: Cliente[]=[];
  personaArray: Persona[]=[ ];
  personaInfo: Persona= new Persona();

  constructor(private habitacionesService:HabitacionesService, private clienteService:ClienteService, private personaService: PersonaService,
    private reservaService: ReservaService){}

    ngOnInit(): void{
     
      this.bucarReserva();
    }

    buscarcategorias(id:any){
      this.habitacionesService.getCategoria(id).subscribe(
        (categorias) => this.Categoria = categorias
        );
    }

    bucarHbitacion(){
    
    }

    bucarReserva(){
      this.reservaService.getReserva().subscribe(
        reservaInd =>{ this.resevaHisto = reservaInd;
          for ( const reservaInfo of this.resevaHisto){
            this.clienteService.getCliente(reservaInfo.idCliente).subscribe(
              clienteInf => {
                this.clientesEncontrado = clienteInf;
                for ( const clienteInfo of this.clientesResult){
                  this.clientesEncontrado =  clienteInfo;
                  this.personaService.getPersona(clienteInfo.cedula_persona).subscribe(
                    personaInf =>{
                    

                    }
                  );
                  }

                }

              }
            );

          }

        }
      );

    }

}
