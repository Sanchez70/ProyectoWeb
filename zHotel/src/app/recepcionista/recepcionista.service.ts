import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recepcionista } from './recepcionista';


@Injectable({
  providedIn: 'root'
})
export class RecepcionistaService {

  private urlEndPoint: string = 'http://localhost:8080/api/recepcionistas';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getRecepcionistas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlEndPoint}`);
  }

  create(recepcionista: Recepcionista): Observable<Recepcionista> {
    return this.http.post<Recepcionista>(this.urlEndPoint, recepcionista, { headers: this.httpHeaders });
  }

  getRecepcionista(id: number): Observable<Recepcionista> {
    return this.http.get<Recepcionista>(`${this.urlEndPoint}/${id}`);
  }

  eliminarRecepcionista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  createRecepcionista(recepcionista: any): Observable<any> {
    return this.http.post(`${this.urlEndPoint}/recepcionistas`, recepcionista);
  }


}
