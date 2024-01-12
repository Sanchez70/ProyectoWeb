import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Servicio } from './servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private urlEndPoint: string = 'http://localhost:8080/api/servicios';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.urlEndPoint).pipe(
      map(response => response as Servicio[])
    );
  }

  create(articulo: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.urlEndPoint, articulo, { headers: this.httpHeaders })
  }

  getProveedorid(id: any): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.urlEndPoint}/${id}`);
  }

  deleteProveedorid(id: any): Observable<Servicio> {
    return this.http.delete<Servicio>(`${this.urlEndPoint}/${id}`);
  }
}
