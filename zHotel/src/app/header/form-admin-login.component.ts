import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-admin-login',
  templateUrl: './form-admin-login.component.html',
  styleUrl: './form-admin-login.component.css'
})
export class FormAdminLoginComponent {

  constructor(private  inicio: AppComponent, private router: Router){}
   apagar(){
    this.router.navigate(['./login']);
    this.inicio.logout()
  }

}
