import { Component } from '@angular/core';
import { Servicio } from '../servicios/servicio';
import { Servicios2 } from './servicios2';
import { ServicioService } from '../servicios/servicio.service';
import { Servicio2Service } from './servicio2.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-from',
  templateUrl: './form.component.html',
})
export class FormComponentServi {
  public servicio: Servicio = new Servicio()
  public servicio2: Servicios2 = new Servicios2()
  public titulo: String = "Crear Servicio"

  constructor(private servicioService: ServicioService,private servicio2Service: Servicio2Service, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarServicios()
  }

  cargarServicios(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.servicioService.getServicioid(id).subscribe((servicio) => {
          //console.log(servicio);
          this.servicio = servicio;
        })
      }
    })
  }

  public create(): void {
    this.servicio2Service.create(this.servicio2)
      .subscribe(servicio2 => {
        this.router.navigate(['/servicios2'])
        Swal.fire('Servicio guardado', `Servicio ${servicio2.idTipo_servicio} Guardado con exito`, 'success')
      }
      )
  }

}
