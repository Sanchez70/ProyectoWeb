import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegistroC } from './registroC';
import { Cliente } from '../clientes/cliente';

@Injectable({
  providedIn: 'root',
})
export class RegistroCService {
  private apiUrl = 'http://localhost:8081/api/clientes';
  private httpHeaders = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) {}

  // Método para registrar un cliente
  registrarCliente(datosCliente: any): Observable<Cliente> {
    const url = `${this.apiUrl}/registrarCliente`;
    return this.http.post<Cliente>(url, datosCliente, { headers: this.httpHeaders })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al registrar cliente:', error);
  
          if (error.status === 500) {
            return throwError('Ocurrió un error interno en el servidor. Por favor, inténtalo nuevamente más tarde.');
          } else {
            return throwError('Ocurrió un error. Por favor, verifica tus datos e inténtalo nuevamente.');
          }
        })
      );
  }
}

  obtenerDatosPersonaPorCedula(cedula: string): Observable<any> {
    const url = `${this.apiUrl}/obtenerDatosPersona/${cedula}`;
    return this.http.get<any>(url);
  }
  // Puedes agregar más métodos según sea necesario
}
