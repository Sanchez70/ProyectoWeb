// persona.component.ts
import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html'
})
export class PersonaComponent implements OnInit {
  personas: Persona[] = [];

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe(
      personas => this.personas = personas
    );
  }

  eliminarPersona(cedula: string): void {
    this.personaService.deletePersona(cedula).subscribe(() => {
      // Vuelve a cargar la lista después de eliminar una persona
      this.cargarPersonas();
    });
  }
}
