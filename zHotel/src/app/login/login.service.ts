import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlEndPoint: string = 'http://localhost:8080/api/login'; // Ajusta la URL según tu backend
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  login(usuario: string, contrasena: string, tipoUsuario: string): Observable<any> {
    const credentials = { usuario, contrasena, tipoUsuario };

    return this.http.post<any>(this.urlEndPoint, credentials, { headers: this.httpHeaders });
  }
}
