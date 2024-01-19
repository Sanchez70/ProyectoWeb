import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroCService } from './registroC.service';
import { Router } from '@angular/router';
import { RegistroC } from './registroC';

@Component({
  selector: 'app-formRC',
  templateUrl: './formRC.component.html',
})
export class FormRCComponent implements OnInit {

  registroC: RegistroC;
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registroCService: RegistroCService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      cedula_persona: ['', Validators.required],
      // Agrega más campos según tus necesidades y valida si es necesario
    });
    this.registroC = new RegistroC;
  }

  ngOnInit(): void {
    // Puedes realizar inicializaciones aquí si es necesario
  }

  onSubmit(): void {
    const cedulaPersona = this.registroForm.get('cedula_persona')?.value;

    // if (cedulaPersona) {
    //   this.registroCService.obtenerDatosPersonaPorCedula(cedulaPersona).subscribe(
    //     (datosPersona) => {
    //       // Puedes realizar acciones con los datos de persona si es necesario
    //     },
    //     (error) => {
    //       console.error('Error al obtener datos de persona:', error);
    //       // Puedes manejar el error según tus necesidades
    //     }
    //   );
    // }

    const datosCliente = {
      usuario: this.registroForm.get('usuario')?.value,
      contrasena: this.registroForm.get('contrasena')?.value,
      cedula_persona: cedulaPersona,
      // Agrega más campos según tus necesidades
    };

    // Lógica para registrar el cliente
    this.registroCService.registrarCliente(datosCliente).subscribe(
      () => {
        // Redirige a la ruta deseada después de registrar el cliente
        this.router.navigate(['/ruta-donde-redirigir']);
      },
      (error) => {
        console.error('Error al registrar cliente:', error);
        // Puedes manejar el error según tus necesidades
      }
    );
  }
}
