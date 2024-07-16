export const ENDPOINTS = {
  /* Login endpoint*/
  LOGIN_SESSION: '/iniciarsesion',
  RECOVER_PASSWORD: '/usuario/recuperarContrasenia',
  /* User enpoint */
  USER_ACTIVE: '/actual-usuario',
  /* Register endpoint */
  REGISTER_USER: '/usuario/registrarse',
  /* Params endpoints */
  COUNTRY_ACTIVE: '/paises/listarpaisesactivos',
  LANGUAGE_ACTIVE: '/idiomas/listaridiomasactivos',
  LANGUAGE_LEVEL_ACTIVE: '/nivelesidioma/listarnivelesidiomaactivos',
  INTERESTS_ACTIVE: '/intereses/listarinteresesactivos',
  /* Main page endpoint */
  SEARCH_ROOM: '/reunionvirtual/listarsalasactivas/?idCuenta=${id}',
  SEARCH_FILTER_ROOM:
    '/reunionvirtual/listarsalasactivasfiltradas/?idCuenta=${id}&edadMinima=${minAge}&edadMaxima=${maxAge}&intereses=${interest}&nombrePais=${country}&nombreNivelIdioma=${levelLanguage}',
  SEARCH_USER: '/usuario/buscarUsuario?parametroDeBusqueda=${search}',
  LANGUAGE_LEARN: '/cuenta/obteneridiomaaprendiz/?idCuenta=${id}',
  RANKING_USERS: '/gamificacion/tablaranking?idCuenta=${id}&cantidadFilas=15',
};
