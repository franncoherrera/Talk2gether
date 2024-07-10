export interface Authority {
  authority: string;
}

export interface Follower {
  id: number;
  fechaHoraAltaSeguidor: string;
  fechaHoraFinVigenciaSeguidor: string | null;
  idCuenta: number;
}

export interface Following {
  id: number;
  fechaHoraAltaSeguido: string;
  fechaHoraFinVigenciaSeguido: string | null;
  idCuenta: number;
}

export interface Role {
  fechaHoraAltaRol: string;
  fechaHoraFinVigenciaRol: string | null;
  id: number;
  nombreRol: string;
}

export interface CurrentUser {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: Authority[];
  cantidadReferidos: number;
  contrasenia: string;
  correo: string;
  credentialsNonExpired: boolean;
  cuentaCreada: string;
  cuentaEliminada: string | null;
  cuentaVerificada: string;
  enabled: boolean;
  id: number;
  listaSeguidores: Follower[];
  listaSeguidos: Following[];
  password: string;
  rol: Role;
  ultimaConexion: string;
  urlFoto: string;
  username: string;
}
