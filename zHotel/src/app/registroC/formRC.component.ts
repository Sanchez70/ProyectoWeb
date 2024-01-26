
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
      //foto: ['', Validators.required],
    });
  }

  // registrarCliente(): void {
  //   this.registroC = this.formRC.value;
  //   this.registroC.cedula_persona = this.cedulaPersona;
  //   this.registroCService.registrarCliente(this.registroC).subscribe(
  //     () => {
  //       Swal.fire('Registro exitoso', 'success');
        
  //       this.router.navigate(['/']); 
  //     },
  //     (error) => {
  //       console.error('Error al registrar cliente:', error);
  //       Swal.fire('Error', 'Ocurrió un error al intentar registrar sus datos', 'error');
  //     }
  //   );
  // }

  registrarCliente(): void {
    if (!this.previewImage) {
      Swal.fire('Error', 'Por favor, seleccione una imagen', 'error');
      return;
    }
  
    // Asignar la foto antes de enviarla al servicio
    const base64String = this.previewImage.toString();
    this.registroC.foto = base64String;
  
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
   

  imagenSeleccionada: any;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.previewImage = e.target.result;
      this.registroC.foto = this.previewImage.toString();
    };

    reader.readAsDataURL(file);
  }
  previewImage: string | ArrayBuffer = '';

  imageRequiredValidator(control: any): { [key: string]: any } | null {
    const value = control.value;
  
    if (value instanceof FileList && value.length > 0) {
      return null; // Imagen seleccionada, la validación pasa
    }
  
    if (typeof value === 'string' && value !== '') {
      return null; // Dirección de imagen proporcionada, la validación pasa
    }
  
    return { 'imageRequired': true }; // Falla la validación si no se proporciona una imagen
  }
}
