import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cliente } from '../clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://192.168.40.228:8081/api/clientes'; // Reemplaza con la URL correcta de tu backend

  constructor(private http: HttpClient) {}

  buscarCliente(usuario: string): Observable<Cliente | Cliente[]> {
    const url = `${this.apiUrl}/usuario/${usuario}`;
    return this.http.get<Cliente | Cliente[]>(url);
  }


 
}
