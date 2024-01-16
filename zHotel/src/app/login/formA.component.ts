import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../clientes/cliente.service'; // Ajusta la ruta del servicio según tu estructura
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../clientes/cliente'; // Ajusta la ruta de la clase Usuario según tu estructura
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formA',
  templateUrl: './formA.component.html',
})
export class FormAComponent implements OnInit {
  usuario: Cliente = new Cliente();
  titulo: string = 'Crear Usuario';
  tipoUsuario: string = ''; // Asegúrate de tener la propiedad tipoUsuario

  constructor(
    private clienteService: ClienteService, // Asegúrate de inyectar el servicio correcto
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe((usuario) => {
          this.usuario = usuario;
          this.titulo = 'Editar Usuario';
        });
      }
    });
  }

  submitForm(): void {
    this.clienteService.getCliente(this.usuario).subscribe(
      (usuario) => {
        this.router.navigate(['/usuarios']); // Cambia '/usuarios' con la ruta correcta después de crear/editar
        Swal.fire('Usuario guardado', `Usuario ${usuario.usuario} guardado con éxito`, 'success');
      },
      (error) => {
        console.error('Error al guardar el usuario', error);
        Swal.fire('Error', 'Ocurrió un error al guardar el usuario', 'error');
      }
    );
  }
}
