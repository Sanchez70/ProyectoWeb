// registroC.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroC } from './registroC';

@Injectable({
  providedIn: 'root',
})
export class RegistroCService {
  private apiUrl = 'http://localhost:8081/api';
  private urlEndPoint = `${this.apiUrl}/clientes`; // Ajusta la ruta según tu configuración

  constructor(private http: HttpClient) {}

  // Método para registrar al cliente
  registrarCliente(registroC: RegistroC): Observable<RegistroC> {
    return this.http.post<RegistroC>(this.urlEndPoint, registroC);
  }
}
