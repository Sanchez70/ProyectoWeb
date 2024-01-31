 // form-recepcionista.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recepcionista } from './recepcionista';
import { RecepcionistaService } from './recepcionista.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Persona } from '../persona/persona';
import { PersonaService } from '../persona/persona.service';

@Component({
  selector: 'app-form-recepcionista',
  templateUrl: './form-recepcionista.component.html',
})
export class FormRecepcionistaComponent implements OnInit {
  public recepcionista: Recepcionista = new Recepcionista();
  public titulo: string = 'Crear Recepcionista';
  //public recepcionistaForm: FormGroup;
  personaId: number = 0;
  personas: Persona[] = [];

  constructor(
    private recepcionistaService: RecepcionistaService,
    private personaService: PersonaService 
  ) {}

  ngOnInit(): void {
    this.recepcionista.usuario = 'NombreUsuario';
    this.recepcionista.contrasena = 'ContrasenaSecreta';
    
    // Obtén la lista de personas antes de cargar el formulario
    this.personaService.getPersonas().subscribe(
      (personas) => {
        this.personas = personas;
      },
      (error) => {
        console.error('Error al obtener la lista de personas', error);
        // Puedes manejar el error según tus necesidades
      }
    );
  }

  create(): void {
    // Verifica si la cédula existe en la lista de personas
    const personaExistente = this.personas.find(persona => persona.cedula_persona === this.recepcionista.cedula_persona);
  
    if (personaExistente) {
      // La persona existe, puedes continuar con la creación del recepcionista
      this.recepcionistaService.createRecepcionista({
        usuario: this.recepcionista.usuario,
        contrasena: this.recepcionista.contrasena,
        cedula_persona: this.recepcionista.cedula_persona,
        
        personaId: personaExistente.cedula_persona, // Utiliza la cédula de la persona existente
        // Otros campos si es necesario
      }).subscribe(
        (recepcionista) => {
          // Lógica después de la creación del recepcionista
          console.log('ID del recepcionista creado:', recepcionista.idRecepcionista);
          Swal.fire('Recepcionista guardado', `Recepcionista ${recepcionista.usuario} guardado con éxito`, 'success');
        },
        (error) => {
          console.error('Error al crear el recepcionista', error);
          Swal.fire('Error', 'Hubo un error al crear el recepcionista', 'error');
        }
      );
    } else {
      // Muestra un mensaje o realiza la acción que consideres adecuada si la persona no existe
      console.error('La persona con la cédula proporcionada no existe.');
      // Puedes mostrar un mensaje al usuario o realizar otra acción según tus necesidades
    }
  }
  
  
  
}
