export interface AUTHORITY {
  authority: string;
}

export interface FOLLOWER {
  id: number;
  fechaHoraAltaSeguidor: string;
  fechaHoraFinVigenciaSeguidor: string | null;
  idCuenta: number;
}

export interface FOLLOWING {
  id: number;
  fechaHoraAltaSeguido: string;
  fechaHoraFinVigenciaSeguido: string | null;
  idCuenta: number;
}

export interface ROLE {
  fechaHoraAltaRol: string;
  fechaHoraFinVigenciaRol: string | null;
  id: number;
  nombreRol: string;
}

export interface CURRENT_USER {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: AUTHORITY[];
  cantidadReferidos: number;
  contrasenia: string;
  correo: string;
  credentialsNonExpired: boolean;
  cuentaCreada: string;
  cuentaEliminada: string | null;
  cuentaVerificada: string;
  enabled: boolean;
  id: number;
  listaSeguidores: FOLLOWER[];
  listaSeguidos: FOLLOWING[];
  password: string;
  rol: ROLE;
  ultimaConexion: string;
  urlFoto: string;
  username: string;
}
