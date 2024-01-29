
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
  previewImage: string | ArrayBuffer = '';  

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

        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: '¡Bienvenido a EzHotel!',
          showConfirmButton: false,
          timer: 2000  
        });
  
        setTimeout(() => {
          this.router.navigate(['/']); 
        }, 2000);
      },
      (error) => {
        console.error('Error al registrar cliente:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al intentar registrar los datos',
          showConfirmButton: true
        });
      }
    );
  }

 
  selectFile(event: any):void{
    const file: File=
    event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e:any)=>{
      this.previewImage = e.target.result;
    };
    reader.readAsDataURL(file);
    this.convertirFoto();
  }

  // convertirFoto(event: any):void {
  //   const file: File=
  //   event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (e: any)=> {

  //     console.log(e.target.result);

  //     this.registroC.foto = e.target.result;
  //   };
  //   reader.readAsDataURL(file);
  // }
  convertirFoto():void{
    if(this.previewImage){
      const img64= this.previewImage.toString();
      console.log(img64);

      this.registroC.foto=img64;
    }
  }

  imagenPreview(event: any): void{
    const file: File =
    event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any)=> {
      this.imagenPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
