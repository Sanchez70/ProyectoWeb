import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8081/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor( private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);

    return this.http.get<Cliente[]>(this.urlEndPoint);

    //return this.http.get(this.urlEndPoint).pipe(map(response=>response as Cliente[]));
  }

  getCliente(idCliente: any):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${idCliente}`);
  }
}
