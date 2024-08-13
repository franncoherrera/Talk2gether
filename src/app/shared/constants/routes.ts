/**
 * General path constants.
 * 
 * This object contains general path configurations for the application.
 * 
 * @constant
 * @type {{ MAIN_PATH: string }}
 * 
 */
export const GENERAL_PATH = {
  MAIN_PATH: '',
};

/**
 * Route path constants.
 * 
 * This object contains path constants for different routes in the application.
 * 
 * @constant
 * 
 * @property {string} LOGIN_PATH - Path for the login page.
 * @property {string} USER_BLOCKED_BY_ADMIN_PATH - Path for the user blocked by administrator page.
 * @property {string} REGISTER_PATH - Path for the registration page.
 * @property {string} TERMS_CONDITION_PATH - Path for the terms and conditions page.
 * @property {string} MAIN_PAGE - Path for the main page.
 * @property {string} RANKING_PAGE - Path for the ranking page.
 * @property {string} CONFIG_PAGE - Path for the personal configuration page.
 * @property {string} VIDEO_CALL_PAGE - Path for the video call page.
 * @property {string} CHAT_MESSAGES - Path for the chat messages page.
 */
export const ROUTES_PATH = {
  /* Login route */
  LOGIN_PATH: 'login',
  /* User blocked by administrator route */
  USER_BLOCKED_BY_ADMIN_PATH: 'bloqueado',
  /* Register module paths */
  REGISTER_PATH: 'registro',
  TERMS_CONDITION_PATH: 'terminos',
  /* Main page module paths */
  MAIN_PAGE: 'inicio',
  /* Ranking */
  RANKING_PAGE: 'ranking',
  /* Personal configurations */
  CONFIG_PAGE: 'configuracion',
  /* Video call */
  VIDEO_CALL_PAGE: 'reunion-virtual',
  /* Chat */
  CHAT_MESSAGES: 'chat',
};