export class Login {
    usuario: string;
    contrasena: string;
    tipoUsuario: string; // Suponiendo que hay un campo para el tipo de usuario
  
    constructor(usuario: string, contrasena: string, tipoUsuario: string) {
      this.usuario = usuario;
      this.contrasena = contrasena;
      this.tipoUsuario = tipoUsuario;
    }
  }
  