import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service'; // Asegúrate de importar el servicio correcto
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './usuario'; // Asegúrate de importar la clase de usuario correcta
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formA',
  templateUrl: './formA.component.html',
})
export class FormAComponent implements OnInit {
  usuario: Usuario = new Usuario();
  titulo: string = 'Crear Usuario';
  tipoUsuario: string = ''; // Asegúrate de tener la propiedad tipoUsuario

  constructor(
    private usuarioService: UsuarioService, // Asegúrate de inyectar el servicio correcto
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.usuarioService.getUsuario(id).subscribe((usuario) => {
          this.usuario = usuario;
          this.titulo = 'Editar Usuario';
        });
      }
    });
  }

  submitForm(): void {
    this.usuarioService.createOrUpdateUsuario(this.usuario).subscribe(
      (usuario) => {
        this.router.navigate(['/usuarios']); // Cambia '/usuarios' con la ruta correcta después de crear/editar
        Swal.fire('Usuario guardado', `Usuario ${usuario.nombre} guardado con éxito`, 'success');
      },
      (error) => {
        console.error('Error al guardar el usuario', error);
        Swal.fire('Error', 'Ocurrió un error al guardar el usuario', 'error');
      }
    );
  }
}
