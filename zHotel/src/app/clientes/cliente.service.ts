import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://192.168.40.228:8081/api/clientes';
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
  obtenerDatosPersonaPorCedula(cedula: string): Observable<any> {
    const url = `${this.urlEndPoint}/ruta-donde-obtener-datos-persona/${cedula}`;

    return this.http.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener datos de persona:', error);
        return throwError('Ocurrió un error al obtener datos de persona. Por favor, inténtalo nuevamente.');
      })
    );
  }

  registrarCliente(datosCliente: any): Observable<any> {
    const url = `${this.urlEndPoint}`;

    return this.http.post<any>(url, datosCliente, { headers: this.httpHeaders }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al registrar cliente:', error);

        if (error.status === 500) {
          return throwError('Ocurrió un error interno en el servidor. Por favor, inténtalo nuevamente más tarde.');
        } else {
          return throwError('Ocurrió un error. Por favor, verifica tus datos e inténtalo nuevamente.');
        }
      })
    );
  }
}

