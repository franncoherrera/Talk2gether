export const ENDPOINTS = {
  /* Login endpoint*/
  LOGIN_SESSION: '/iniciarsesion.json',
  RECOVER_PASSWORD: '/usuario/recuperarContrasenia',
  /* User enpoint */
  USER_ACTIVE: '/actual-usuario.json',
  /* Register endpoint */
  REGISTER_USER: '/usuario/registrarse',
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
};
