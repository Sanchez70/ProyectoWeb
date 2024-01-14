import { Injectable } from '@angular/core';
import { Reserva } from './reserva';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private urlEndPoint:string = 'http://localhost:8081/api/reserva';
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) { }
  getReserva(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlEndPoint);
  }

  create(reserva:Reserva):Observable<Reserva>{
    return this.http.post<Reserva>(this.urlEndPoint, reserva, {headers:this.httpHeaders})
  }

  getreserva(id: any):Observable<Reserva>{
    return this.http.get<Reserva>(`${this.urlEndPoint}/${id}`);
  }

 
}