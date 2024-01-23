// servicio-recepcion.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicioRecepcion {
  constructor(private http: HttpClient) {}

  getHabitaciones(): Observable<any[]> {
    const apiUrl = 'http://192.168.40.228:8081/api/habitaciones';
    return this.http.get<any[]>(apiUrl).pipe(
      catchError(error => {
        console.error('Error en la solicitud de habitaciones:', error);
        return throwError(error);
      })
    );
  }

  getHabitacionById(id: number): Observable<any> {
    const apiUrl = ` http://192.168.40.228:8081/api/habitaciones/${id}`;
    return this.http.get<any>(apiUrl).pipe(
      catchError(error => {
        console.error(`Error al obtener la habitación con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  eliminarHabitacion(id: number): Observable<void> {
    const apiUrl = ` http://192.168.40.228:8081/api/habitaciones/${id}`;
    return this.http.delete<void>(apiUrl).pipe(
      catchError(error => {
        console.error(`Error al eliminar la habitación con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }
}
