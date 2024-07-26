import { INTEREST } from './parameter.model';

export interface CONFIG_USER {
  id: number;
  apellidoUsuario: string;
  correo: string;
  descripcion: string;
  fechaNacimiento: string;
  listaIntereses: INTEREST[];
  nombreIdiomaAprender: string;
  nombreIdiomaNativo: string;
  nombreNivelIdioma: string;
  nombrePais: string;
  nombreUsuario: string;
  urlFoto: string;
}
