import { Component, OnInit } from '@angular/core';
import { Reserva } from './reserva';
import { ReservaService } from './reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitaciones } from '../habitaciones/habitaciones';
import { HabitacionesService } from '../habitaciones/habitaciones.service';
@Component({
  selector: 'app-form-reservas',
  templateUrl: './form-reservas.component.html',
})
export class FormReservasComponent implements OnInit {
  public reserva:Reserva = new Reserva()
  public habitaciones: Habitaciones = new Habitaciones()
  public titulo:string="Crear Cliente"
  constructor(private reservaService:ReservaService, private habitacionesService:HabitacionesService, private router:Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    
  }

  cargarhabitacion(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.habitacionesService.getHabitacionesid(id).subscribe((habitacion) => this.habitaciones = habitacion)
      }
    })
  }

  public create():void{
    this.reservaService.create(this.reserva).subscribe(
        response => {
          this.router.navigate(['/habitaciones'])
          //Swal.fire('Reserva realizada',`Reserva guardada con éxito`,'success')
    }
    );
  }
}
