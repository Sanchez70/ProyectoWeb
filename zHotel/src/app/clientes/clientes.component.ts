import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Login } from '../login/login';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit{

  public cliente:Cliente = new Cliente()
  clientes:Cliente[]=[
    {idCliente: 1, usuario:'Santana', contrasena: '1234', cedula_persona:'0106130586', foto: ''},
    {idCliente: 1, usuario:'Carlos', contrasena: '1234', cedula_persona:'0106130586', foto: ''}
  ];

  constructor(private clienteService: ClienteService, private router:Router,
    private activatedRoute: ActivatedRoute, private loginService:LoginService) { }
  
  ngOnInit(): void {
    const usuarioAutenticado = this.loginService.getUsuarioAutenticado();
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['idCliente/usuario']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }
}
