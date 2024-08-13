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
  LOGIN_SESSION: '/iniciarsesion',
  RECOVER_PASSWORD: '/usuario/recuperarContrasenia',
  USER_ACTIVE: '/actual-usuario',
  REGISTER_USER: '/usuario/registrarse',
  REGISTER_USER_REFERAL: '/usuario/registrarse?idCuenta=${idReferral}',
  COUNTRY_ACTIVE: '/paises/listarpaisesactivos',
  LANGUAGE_ACTIVE: '/idiomas/listaridiomasactivos',
  LANGUAGE_LEVEL_ACTIVE: '/nivelesidioma/listarnivelesidiomaactivos',
  INTERESTS_ACTIVE: '/intereses/listarinteresesactivos',
  SEARCH_ROOM: '/reunionvirtual/listarsalasactivas/?idCuenta=${id}',
  SEARCH_FILTER_ROOM:
    '/reunionvirtual/listarsalasactivasfiltradas/?idCuenta=${id}&edadMinima=${minAge}&edadMaxima=${maxAge}&intereses=${interest}&nombrePais=${country}&nombreNivelIdioma=${levelLanguage}',
  SEARCH_USER: '/usuario/buscarUsuario?parametroDeBusqueda=${search}',
  LANGUAGE_LEARN: '/cuenta/obteneridiomaaprendiz/?idCuenta=${id}',
  RANKING_USERS: '/gamificacion/tablaranking?idCuenta=${id}&cantidadFilas=15',
  REFERRAL_LINK: '/cuenta/referirusuario/?idCuenta=${id}',
  CONFIG_DATA: '/cuenta/obtenerdatospersonales/?idCuenta=${id}',
  EDIT_DATA: '/usuario/modificarUsuario?idCuenta=${id}',
  BLOQUED_USERS: '/cuenta/usuariosbloqueados?idCuenta=${id}',
  CHANGE_PASS: '/usuario/cambiarcontrasenia',
  LIST_MOTIVES_USER: '/motivos/listarmotivosactivos?nombreTipoMotivo=usuario',
  DELETE_USER_ACCOUNT: '/usuario/eliminarcuenta',
  GET_PARTICIPANT:
    '/reunionvirtual/obtenerUsuarioACalificar?idCuenta=${id}&url=${idMeeting}',
  RATE_USER: '/usuario/calificarusuario',
};
