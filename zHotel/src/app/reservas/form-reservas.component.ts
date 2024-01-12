import { Component, OnInit } from '@angular/core';
import { Reserva } from './reserva';
import { ReservaService } from './reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-form-reservas',
  templateUrl: './form-reservas.component.html',
})
export class FormReservasComponent implements OnInit {
  public reserva:Reserva = new Reserva()
  public titulo:string="Crear Cliente"
  constructor(private reservaService:ReservaService, private router:Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    
  }

  public create():void{
    this.reservaService.create(this.reserva).subscribe(
        response => {
          this.router.navigate(['/clientes'])
          //Swal.fire('Cliente guardado',`Reserva guardada con éxito`,'success')
    }
    );
  }
}
