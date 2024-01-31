import { Component, OnInit } from '@angular/core';
import { Servicio2Service } from './servicio2.service';
import { Servicios2 } from './servicios2';

@Component({
  selector: 'app-servicios2',
  templateUrl: './servicios2.component.html',
})
export class Servicios2Component implements OnInit {

  Servicios2: Servicios2[] = []

  constructor(private servicio2service: Servicio2Service) { }

  ngOnInit(): void {
    this.servicio2service.getServicios2().subscribe(
      Servicios2 => this.Servicios2 = Servicios2
    );
  }

}
