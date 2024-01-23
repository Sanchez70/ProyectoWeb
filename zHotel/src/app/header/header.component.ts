import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private  inicio: AppComponent, private router: Router,){}
  apagar(){
    this.router.navigate(['./login']);
    this.inicio.logout()
  }

  usuario: number =  this.inicio.idUsuario;

  abrirFormularioPersona(): void {
    // Redirige directamente al formulario de creación de persona
    this.router.navigate(['/persona/form']);
  }

}
