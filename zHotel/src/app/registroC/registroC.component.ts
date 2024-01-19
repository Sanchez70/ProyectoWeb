import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from '../clientes/cliente.service';

@Component({
  selector: 'app-registroC',
  templateUrl: './registroC.component.html'
})
export class RegistroCComponent {
  registroForm: FormGroup;
  datosPersona: any;  // Ajusta el tipo según el modelo de datos de persona

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.registroForm = this.fb.group({
      // Define tus campos de formulario aquí
      usuario: [''],
      contrasena: [''],
      cedula_persona: [''],
      // Agrega más campos según tus necesidades
    });
  }

  // Método para buscar datos de persona por cédula
  buscarDatosPersona(): void {
    const cedulaPersona = this.registroForm.get('cedula_persona')?.value;

    if (cedulaPersona) {
      // Llama al servicio para obtener los datos de persona
      this.clienteService.obtenerDatosPersonaPorCedula(cedulaPersona).subscribe(
        (datosPersona) => {
          this.datosPersona = datosPersona;
        },
        (error) => {
          console.error('Error al buscar datos de persona:', error);
          // Puedes manejar el error según tus necesidades
        }
      );
    }
  }

  // Método para registrar el cliente
  registrarCliente(): void {
    const usuario = this.registroForm.get('usuario')?.value;
    const contrasena = this.registroForm.get('contrasena')?.value;
    const cedulaPersona = this.registroForm.get('cedula_persona')?.value;

    if (usuario && contrasena && cedulaPersona) {
      const datosCliente = {
        usuario,
        contrasena,
        cedula_persona: cedulaPersona,
        // Agrega más campos según tus necesidades
      };

      // Lógica para registrar el cliente
      this.clienteService.registrarCliente(datosCliente).subscribe(
        () => {
          // Puedes realizar acciones adicionales después de registrar el cliente
        },
        (error) => {
          console.error('Error al registrar cliente:', error);
          // Puedes manejar el error según tus necesidades
        }
      );
    }
  }
}
