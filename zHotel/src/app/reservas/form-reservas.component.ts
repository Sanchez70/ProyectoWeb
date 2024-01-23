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
import { AppComponent } from '../app.component';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-form-reservas',
  templateUrl: './form-reservas.component.html',
})
export class FormReservasComponent implements OnInit {
  idCliente:number = this.inicio.idUsuario;
  fechaEntrada: string='';
  fechaSalida: string='';
  diferenciadias: number = 0;
  idReserva:number=0;
  idEncabezado:number=0;
  idHabitaciones:number=0;
  metodoPago:number=0;
  dias : number =0;
  total: number =0;
  opciones: number[] = [1,2,3,4];
  opcionSeleccionada: number=0;
  
  public reserva:Reserva = new Reserva()
  public encabezado:EncabezadoFactura = new EncabezadoFactura()
  public detalle:DetalleFactura = new DetalleFactura()
  public habitaciones: Habitaciones = new Habitaciones()
  constructor(private reservaService:ReservaService, private habitacionesService:HabitacionesService,private encabezadoService:EncabezadoFacturaService,private detalleService:DetalleFacturaService ,private router:Router,
    private activatedRoute:ActivatedRoute,private inicio: AppComponent){}

  ngOnInit(): void {
    this.cargarhabitacion()
    console.log('Id cliente en reserva',this.idCliente);
  }

  cargarhabitacion(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.habitacionesService.getHabitacionesid(id).subscribe((habitacion) => this.habitaciones = habitacion)
        this.reserva.idHabitaciones=this.habitaciones.idHabitaciones;
        this.reserva.idCliente=this.idCliente;
      }
    })

  }

  create(){
    this.reservaService.create(this.reserva).subscribe(
      response => {
        this.router.navigate(['/habitaciones'])
        Swal.fire('Proveedor guardado',`guardado con éxito`,'success')
  }
  );
  console.log(this.reservaService.create(this.reserva));
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

  calcularTotal(precio : number){
      this.total = precio*this.diferenciadias;
      console.log(precio)
      console.log('TOTAL',this.total)
    
  }
}
