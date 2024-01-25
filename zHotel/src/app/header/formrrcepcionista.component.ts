import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formrrcepcionista',
  templateUrl: './formrrcepcionista.component.html',
  styleUrl: './formrrcepcionista.component.css'
})
export class FormrrcepcionistaComponent {
  constructor(private  inicio: AppComponent, private router: Router){}
  apagar(){
    this.router.navigate(['./login']);
    this.inicio.logout()
  }

}
