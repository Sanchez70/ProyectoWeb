
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
  public registroC: RegistroC = new RegistroC();  

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
    });
  }

  registrarCliente(): void {
    this.registroC = this.formRC.value;
    this.registroC.cedula_persona = this.cedulaPersona;
    this.registroCService.registrarCliente(this.registroC).subscribe(
      () => {
        Swal.fire('Registro exitoso', 'success');
        
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('Error al registrar cliente:', error);
        Swal.fire('Error', 'Ocurrió un error al intentar registrar sus datos', 'error');
      }
    );
  }
}
