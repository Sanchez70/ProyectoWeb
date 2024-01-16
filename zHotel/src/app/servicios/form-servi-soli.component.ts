import { Component, OnInit } from '@angular/core';
import { Servicio } from './servicio';
import { ServicioService } from './servicio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-servi-soli',
  templateUrl: './form-servi-soli.component.html',
  styleUrl: './form-servi-soli.component.css'
})
export class FormServiSoliComponent implements OnInit {

  public servicio: Servicio = new Servicio()
  public titulo: String = "Crear Servicio"

  constructor(private servicioService: ServicioService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
  
}
