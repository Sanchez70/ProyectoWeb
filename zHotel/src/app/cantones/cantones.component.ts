import { Component, OnInit } from '@angular/core';
import { CantonService } from './canton.service';
import { Cantones } from './canton';
import { ProvinciaService } from '../provincias/provincia.service';

@Component({
  selector: 'app-cantones',
  templateUrl: './cantones.component.html',
})
export class CantonesComponent implements OnInit {
  cantones: Cantones[] = [];

  constructor(
    private cantonService: CantonService,
    private provinciaService: ProvinciaService
  ) {}

  ngOnInit(): void {
    console.log("OnInit - Loading Cantones");
    this.loadCantones();
  }

  loadCantones() {
    this.cantonService.getCantones().subscribe(
      (data) => {
        this.cantones = data;
        this.loadProvincias(); // Llama a la función para cargar las provincias
      },
      (error) => {
        console.error('Error loading cantones', error);
      }
    );
  }

  loadProvincias() {
    // Obtén la lista de provincias
    this.provinciaService.getProvincias().subscribe(
      (provincias) => {
        // Asigna las provincias correspondientes a los cantones
        this.cantones.forEach(canton => {
          const provincia = provincias.find(p => p.id_provincia === canton.id_provincia);
          if (provincia) {
            canton.id_provincia = provincia.id_provincia;
            // También puedes asignar otros datos de la provincia según tu necesidad
          }
        });
      },
      (error) => {
        console.error('Error loading provincias', error);
      }
    );
  }
}
