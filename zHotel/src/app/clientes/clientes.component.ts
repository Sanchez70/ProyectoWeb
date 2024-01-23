import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { PersonaService } from '../persona/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { Persona } from '../persona/persona';
import { error } from 'console';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl:'./clientes.component.css'
})
export class ClientesComponent implements OnInit{
  
  id:number= this.inicio.idUsuario;
  cedula:any = this.inicio.cedulaUser;
  public cliente:Cliente = new Cliente()
  public persona: Persona = new Persona()
  clientes:Cliente[]=[];

  constructor(
    private clienteService: ClienteService, 
    private personaService: PersonaService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private inicio: AppComponent) { }
  
  ngOnInit(): void {

    this.cargarCliente();

  }
  
  cargarCliente(): void {

    this.clienteService.getCliente(this.id).subscribe(
      (cliente) => {
        this.cliente = cliente;
        this.cargarPersona()
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarPersona(): void{
    this.personaService.getPersona(this.cedula).subscribe(
      (persona) => {
        this.persona = persona;
      },
      (error) => {
        console.error(error);
      }
    )
  }
}