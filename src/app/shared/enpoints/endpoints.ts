/**
 * API endpoint paths for various services.
 *
 * This object defines endpoint paths for different API services used in the application. Each endpoint path is associated with a specific resource or action.
 *
 * @constant
 *
 * @property {string} LOGIN_SESSION - Endpoint for user login.
 * @property {string} RECOVER_PASSWORD - Endpoint for password recovery.
 * @property {string} USER_ACTIVE - Endpoint to get active user information.
 * @property {string} REGISTER_USER - Endpoint for user registration.
 * @property {string} REGISTER_USER_REFERAL - Endpoint for user registration with referral code.
 * @property {string} COUNTRY_ACTIVE - Endpoint to list active countries.
 * @property {string} LANGUAGE_ACTIVE - Endpoint to list active languages.
 * @property {string} LANGUAGE_LEVEL_ACTIVE - Endpoint to list active language levels.
 * @property {string} INTERESTS_ACTIVE - Endpoint to list active interests.
 * @property {string} SEARCH_ROOM - Endpoint to search for active virtual rooms by user ID.
 * @property {string} SEARCH_FILTER_ROOM - Endpoint to search for filtered virtual rooms with various parameters.
 * @property {string} SEARCH_USER - Endpoint to search for users based on search parameter.
 * @property {string} LANGUAGE_LEARN - Endpoint to get the learning language for a user by ID.
 * @property {string} RANKING_USERS - Endpoint to get the ranking of users.
 * @property {string} REFERRAL_LINK - Endpoint to get referral link for a user by ID.
 * @property {string} CONFIG_DATA - Endpoint to get personal configuration data for a user by ID.
 * @property {string} EDIT_DATA - Endpoint to edit user data by ID.
 * @property {string} BLOQUED_USERS - Endpoint to get blocked users by ID.
 * @property {string} CHANGE_PASS - Endpoint to change user password.
 * @property {string} LIST_MOTIVES_USER - Endpoint to list active motives for users.
 * @property {string} DELETE_USER_ACCOUNT - Endpoint to delete a user account.
 * @property {string} GET_PARTICIPANT - Endpoint to get participant information for rating.
 * @property {string} RATE_USER - Endpoint to rate a user.
 */
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
  BLOQUED_USERS: '/cuenta/usuariosbloqueados/usuarios.json',
  CHANGE_PASS: '/usuario/cambiarcontrasenia',
  LIST_MOTIVES_USER: '/motivos/listarmotivosactivosUsuario.json',
  DELETE_USER_ACCOUNT: '/usuario/eliminarcuenta',
  /* Rate user */
  GET_PARTICIPANT: '/reunionvirtual/obtenerUsuarioACalificar/user${id}.json',
  RATE_USER: '/usuario/calificarusuario',
  PROFILE_DATA: '/usuario/visualizarotroperfil?idCuenta=${id}',
  BLOCK_VERIFICATION: '/cuenta/verificarbloqueo'
};
