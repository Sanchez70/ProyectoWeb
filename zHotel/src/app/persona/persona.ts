
import { Cantones } from "../cantones/canton";

export class Persona {
  cedula_persona!: string;
  nombre!: string;
  nombre2!: string;
  apellido!: string;
  apellido2!: string;
  genero!: string;
  telefono!: string;
  direccion!: string;
  edad!: number;
  id_canton!: string; // Agrega esta propiedad

  cantones?: Cantones[]; // Asegúrate de que Cantones tenga las propiedades correctas

  constructor() {
    this.cantones = [];
  }
}

