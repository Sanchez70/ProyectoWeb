import { Component } from '@angular/core';

@Component({
  selector: 'app-formA',
  templateUrl: './formA.component.html',
})
export class FormAComponent {
  usuario: string = ''; // Inicializamos con un valor por defecto
  contrasena: string = '';

  constructor() { }

  onSubmit() {
    console.log('Usuario:', this.usuario);
    console.log('Contraseña:', this.contrasena);
  }
}

