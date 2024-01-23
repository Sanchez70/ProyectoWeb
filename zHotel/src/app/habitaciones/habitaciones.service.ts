import { Injectable } from '@angular/core';
import { Habitaciones } from './habitaciones';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  private urlEndPoint: string = 'http://192.168.40.228:8081/api/habitaciones';
  // private urlEndPoint: string = 'http://localhost:8081/api/habitaciones';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }

  getHabitaciones(): Observable<Habitaciones[]>{
    //return this.http.get<Cliente[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint).pipe(map(response => response as Habitaciones[]));
  }
  
  create(habitaciones: Habitaciones): Observable<Habitaciones> {
    return this.http.post<Habitaciones>(this.urlEndPoint, habitaciones,{headers: this.httpHeaders})
  }

  getHabitacionesid(id: any): Observable<Habitaciones>{
    return this.http.get<Habitaciones>(`${this.urlEndPoint}/${id}`);
  }
  
  delete(id: any): Observable<Habitaciones>{
    return this.http.delete<Habitaciones>(`${this.urlEndPoint}/${id}`)
  }
}
