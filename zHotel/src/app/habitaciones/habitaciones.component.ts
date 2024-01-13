import { Component, OnInit } from '@angular/core';
import { Habitaciones } from './habitaciones';
import Swal from 'sweetalert2';
import { HabitacionesService } from './habitaciones.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent implements OnInit {
  habitaciones: Habitaciones[]=[ ];

  constructor(private habitacionesService:HabitacionesService){}

    ngOnInit(): void{
      this.habitacionesService.getHabitaciones().subscribe(
        Habitaciones => this.habitaciones =   Habitaciones
      );
    }

    

    delete(habitaciones: Habitaciones): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres eliminar al la habitacion:  ${habitaciones.idCategoria}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.habitacionesService.delete(habitaciones.idHabitaciones).subscribe(
            () => {
              this.habitacionesService.getHabitaciones().subscribe(
                (habitacion) => {
                  this.habitaciones = habitacion;
                  Swal.fire('Habitacion eliminado', `Habitacion ${habitaciones.idHabitaciones} eliminado con éxito`, 'success');
                },               
              );
            },        
          );
        }
      });
    }

}
