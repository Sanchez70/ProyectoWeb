// servicio-ocupacion.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioOcupacion {
  constructor(private http: HttpClient) {}

  getOcupacionGeneral(): Observable<number> {
    const apiUrl = 'http://localhost:8081/api/habitaciones'; // Reemplaza con la URL real de tu API
    return this.http.get<number>(apiUrl);
  }
}
