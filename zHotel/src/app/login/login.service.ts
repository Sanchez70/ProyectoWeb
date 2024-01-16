import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cliente } from '../clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/api/clientes';

  constructor(private http: HttpClient) {}

  login(usuario: string, password: string): Observable<Cliente> {
    const loginUrl = `${this.apiUrl}`;

    const body = { usuario: usuario, password: password };

    return this.http.post<Cliente>(loginUrl, body).pipe(
      catchError((error) => {
        return throwError(error); // Pasar el error al componente
      })
    );
  }
}
