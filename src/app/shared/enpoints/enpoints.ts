export const ENDPOINTS = {
  /* Login endpoint*/
  LOGIN_SESSION: '/iniciarsesion.json',
  RECOVER_PASSWORD: '/usuario/recuperarContrasenia',
  /* User enpoint */
  USER_ACTIVE: '/actual-usuario.json',
  /* Register endpoint */
  REGISTER_USER: '/usuario/registrarse',
  REGISTER_USER_REFERAL: '/usuario/registrarse?idCuenta=${idReferral}',
  /* Params endpoints */
  COUNTRY_ACTIVE: '/paises/listarpaisesactivos.json',
  LANGUAGE_ACTIVE: '/idiomas/listaridiomasactivos.json',
  LANGUAGE_LEVEL_ACTIVE: '/nivelesidioma/listarnivelesidiomaactivos.json',
  INTERESTS_ACTIVE: '/intereses/listarinteresesactivos.json',
  /* Main page endpoint */
  SEARCH_ROOM: '/reunionvirtual/listarsalasactivas/salas.json',
  SEARCH_FILTER_ROOM:
    '/reunionvirtual/listarsalasactivasfiltradas/?idCuenta=${id}&edadMinima=${minAge}&edadMaxima=${maxAge}&intereses=${interest}&nombrePais=${country}&nombreNivelIdioma=${levelLanguage}',
  SEARCH_USER: '/usuario/buscarUsuario?parametroDeBusqueda=${search}',
  LANGUAGE_LEARN: '/cuenta/obteneridiomaaprendiz/idioma.json',
  RANKING_USERS: '/gamificacion/tablaranking.json',
  REFERRAL_LINK: '/cuenta/referirusuario/link.json',
  /* Personal configuration endpoint */
  CONFIG_DATA: '/cuenta/obtenerdatospersonales/data.json',
  EDIT_DATA: '/usuario/modificarUsuario?idCuenta=${id}',
  BLOQUED_USERS: '/cuenta/usuariosbloqueados?idCuenta=${id}',
  CHANGE_PASS: '/usuario/cambiarcontrasenia',
  LIST_MOTIVES_USER: '/motivos/listarmotivosactivos?nombreTipoMotivo=usuario',
  DELETE_USER_ACCOUNT: '/usuario/eliminarcuenta',
  /* Rate user */
  GET_PARTICIPANT:
    '/reunionvirtual/obtenerUsuarioACalificar/user${id}.json',
  RATE_USER: '/usuario/calificarusuario',
};
