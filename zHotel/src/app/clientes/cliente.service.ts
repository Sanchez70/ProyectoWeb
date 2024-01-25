import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

   //private urlEndPoint: string = 'http://192.168.40.228:8081/api/clientes';
  private urlEndPoint = 'http://localhost:8081/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor( private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{

    return this.http.get<Cliente[]>(this.urlEndPoint);

    //return this.http.get(this.urlEndPoint).pipe(map(response=>response as Cliente[]));
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.get<Cliente>(url);
  }

  edit(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders})
  }

  //addBF
  createCliente(cliente: Cliente): Observable<Cliente> {
    // Elimina el campo idCliente antes de enviar la solicitud
    const { idCliente, ...clienteSinId } = cliente;
  
    return this.http.post<Cliente>(this.urlEndPoint, clienteSinId, { headers: this.httpHeaders })
      .pipe(
        catchError((error: any) => {
          console.error('Error al crear cliente:', error);
  
          if (error.status === 500) {
            throw new Error('Ocurrió un error interno en el servidor. Por favor, inténtalo nuevamente más tarde.');
          } else {
            throw new Error('Ocurrió un error. Por favor, verifica tus datos e inténtalo nuevamente.');
          }
        })
      );
  }
  
  
  
}

