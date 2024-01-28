import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class vigilanteGuard implements CanActivate {

  constructor(private inicio: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.inicio.isLoggedIn) {
      // Si el usuario está autenticado, no permitir acceder a la página de inicio de sesión
      this.router.navigate(['/carrucel']); // Ajusta la ruta según tu estructura
      return false;
    }
    return true;
  }
}