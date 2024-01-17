import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit{
  usuarioLogeado: any;

  public cliente:Cliente = new Cliente()
  clientes:Cliente[]=[];

  constructor(
    private clienteService: ClienteService, 
    private router:Router,
    private activatedRoute: ActivatedRoute, 
    private userService: UserService) { }
  
  ngOnInit(): void {
    this.usuarioLogeado = this.userService.getCurrentUser();
    this.cargarCliente();
  }

  cargarCliente(): void {
    const usuario = this.usuarioLogeado.usuario;

    this.clienteService.getClienteByUsuario(usuario).subscribe(
      (cliente) => {
        this.cliente = cliente;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
