import { Component, OnInit, OnDestroy } from '@angular/core';
import { Persona } from './persona';
import { Cantones } from '../cantones/canton';
import { CantonService } from '../cantones/canton.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService } from './persona.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formP',
  templateUrl: './formP.component.html',
  styleUrl: './formP.component.css'
})
export class FormPComponent implements OnInit {
  public persona: Persona = new Persona();
  public titulo: string = 'REGISTRO';
  public cantones: Cantones[] = [];  // Agrega este array

  constructor(
    private personaService: PersonaService,
    private cantonesService: CantonService, // Agrega CantonesService
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarPersona();
    this.cargarCantones(); // Agrega esta línea para cargar los cantones
  }

  //ngOnDestroy(): void {
    //if (this.cantonesSubscription) {
      //this.cantonesSubscription.unsubscribe();
    //}
  //}

  cargarPersona(): void {
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['id'];
      if (cedula) {
        this.personaService.getPersona(cedula).subscribe((persona) => this.persona = persona);
      }
    });
  }

  cargarCantones(): void {
    // Lógica para cargar los cantones, utiliza tu servicio o método correspondiente
    this.personaService.getCantones().subscribe((cantones) => {
      this.cantones = cantones;
    });
  }

  crearEditarPersona(): void {
    this.personaService.createPersona(this.persona).subscribe(
      (persona) => {
        this.router.navigate(['/persona']);
        Swal.fire('Persona guardada', `Persona ${persona.nombre} guardada con éxito formPPPP`, 'success');
      },
      (error) => {
        console.error('Error al crear persona:PPPPP', error);
        Swal.fire('Error', 'Ocurrió un error al intentar guardar la persona PPPPPPP', 'error');
      }
    );
  }

  irARegistroC(): void {
    this.personaService.createPersona(this.persona).subscribe(
      (persona) => {
        // Muestra un mensaje de éxito usando SweetAlert2
        Swal.fire('Persona creada con éxito', '', 'success');

        // Redirigir a la interfaz de registro de cliente con la cédula de la persona
        this.router.navigate(['/registroC/form', persona.cedula_persona]);
      },
      (error) => {
        console.error('Error al crear persona:', error);
        // Muestra un mensaje de error si es necesario
        Swal.fire('Error', 'Ocurrió un error al crear la persona', 'error');
      }
    );
  }
  
}
