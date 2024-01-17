import { Component, OnInit } from '@angular/core';
import { Reserva } from './reserva';
import { ReservaService } from './reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitaciones } from '../habitaciones/habitaciones';
import { HabitacionesService } from '../habitaciones/habitaciones.service';
import { EncabezadoFactura } from './encabezado-factura';
import { EncabezadoFacturaService } from './encabezado-factura.service';
import { DetalleFactura } from './detalle-factura';
import { DetalleFacturaService } from './detalle-factura.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-reservas',
  templateUrl: './form-reservas.component.html',
})
export class FormReservasComponent implements OnInit {
  fechaEntrada: string='';
  fechaSalida: string='';
  diferenciadias: number = 0;
  habitaciones2 = {precio:0};
  dias : number =0;
  total: number =0;
  public reserva:Reserva = new Reserva()
  public encabezado:EncabezadoFactura = new EncabezadoFactura()
  public detalle:DetalleFactura = new DetalleFactura()
  public habitaciones: Habitaciones = new Habitaciones()
  constructor(private reservaService:ReservaService, private habitacionesService:HabitacionesService,private encabezadoService:EncabezadoFacturaService,private detalleService:DetalleFacturaService ,private router:Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.cargarhabitacion()
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
          this.encabezadoService.create(this.encabezado).subscribe(
            response=>{
              this.detalleService.create(this.detalle).subscribe(
                response=>{
                  this.router.navigate(['/habitaciones'])
                  Swal.fire('Reserva realizada',`Reserva realizada con éxito`,'success')
                }
              );
            }
          );
          
    }
    );
 
  }

  calcularDiferenciaDeDias() {
    console.log(this.fechaEntrada)
    console.log(this.fechaSalida)
    if(this.fechaEntrada.length!=0 && this.fechaSalida.length!=0){
      const fechaInicio = new Date(this.fechaEntrada);
      const fechaFin = new Date(this.fechaSalida);
      const diferenciaMs = fechaFin.getTime() - fechaInicio.getTime();
      this.diferenciadias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
      console.log(this.diferenciadias)
    }
  }

  calcularTotal(){
    const precio=this.habitaciones2.precio;
    console.log(this.habitaciones2.precio)
    this.total=precio*this.dias;
    console.log('Este es el total',this.total);
  }
}
