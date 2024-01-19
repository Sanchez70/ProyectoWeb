import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit{
  
  usuario:number= this.inicio.usuario;
  public cliente:Cliente = new Cliente()
  clientes:Cliente[]=[];

  constructor(
    private clienteService: ClienteService, 
    private router:Router,
    private activatedRoute: ActivatedRoute, 
    private userService: UserService,
    private inicio: AppComponent) { }
  
  ngOnInit(): void {

    this.cargarCliente();

  }
  
  cargarCliente(): void {
  

    this.clienteService.getClienteByUsuario(this.usuario).subscribe(
      (cliente) => {
        this.cliente = cliente;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}