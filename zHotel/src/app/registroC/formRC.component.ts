// formRC.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroC } from './registroC';
import { RegistroCService } from './registroC.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formRC',
  templateUrl: './formRC.component.html',
  styleUrl: './registroC.component.css'
})
export class FormRCComponent implements OnInit {
  @Input() formRC!: FormGroup;
  public cedulaPersona: string = '';
  public registroC: RegistroC = new RegistroC();  // Crea una instancia de RegistroC

  constructor(
    private fb: FormBuilder,
    private registroCService: RegistroCService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.route.params.subscribe(params => {
      this.cedulaPersona = params['cedula_persona'];
    });
  }

  buildForm(): void {
    this.formRC = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      foto: ['', Validators.required],
      // Puedes agregar más campos según tus necesidades
    });
  }

<<<<<<< Updated upstream
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
=======
  registrarCliente(): void {
    // Asigna los valores del formulario al objeto RegistroC
    this.registroC = this.formRC.value;
    this.registroC.cedula_persona = this.cedulaPersona;  // Asigna la cédula
>>>>>>> Stashed changes

    // Llamada al servicio para registrar al cliente
    this.registroCService.registrarCliente(this.registroC).subscribe(
      () => {
        Swal.fire('Cliente registrado', 'El cliente se ha registrado con éxito.', 'success');
        // Puedes redirigir a donde desees después de registrar al cliente
        this.router.navigate(['/']); // Por ejemplo, redirigir al inicio
      },
      (error) => {
        console.error('Error al registrar cliente:', error);
        Swal.fire('Error', 'Ocurrió un error al intentar registrar al cliente.', 'error');
      }
    );
  }
}
