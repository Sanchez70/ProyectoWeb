import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit{

  public cliente:Cliente = new Cliente()
  clientes:Cliente[]=[];

  constructor(
    private appComponent: AppComponent,
    private clienteService: ClienteService, 
    private router:Router,
    private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.clienteService.getClienteByUsuario(this.appComponent.usuario).subscribe(
      (cliente) => {
        this.cliente = cliente;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
