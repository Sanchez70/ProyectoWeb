import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  template: `
    <app-carousel></app-carousel>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Redirige a la página de carrusel después de 5 segundos (ajusta según tus necesidades)
    setTimeout(() => {
      this.router.navigate(['/carrucel']); // Ajusta '/carrucel' por la ruta correcta
    }, 5000);
  }
}
