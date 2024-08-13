/**
 * Regular expression patterns used for various validations.
 *
 * @constant
 * @type {{ patternEmail: RegExp, patterOnlyLetters: RegExp, patterOnlyNumber: RegExp, hasUpperCase: RegExp, hasLowerCase: RegExp, hasNumber: RegExp, imageType: RegExp }}
 *
 * @property {RegExp} patternEmail - Regular expression for validating email addresses.
 * @property {RegExp} patterOnlyLetters - Regular expression for validating strings containing only letters (including accented characters) and spaces.
 * @property {RegExp} patterOnlyNumber - Regular expression for validating strings containing only numbers.
 * @property {RegExp} hasUpperCase - Regular expression for checking the presence of at least one uppercase letter.
 * @property {RegExp} hasLowerCase - Regular expression for checking the presence of at least one lowercase letter.
 * @property {RegExp} hasNumber - Regular expression for checking the presence of at least one number.
 * @property {RegExp} imageType - Regular expression for validating image file extensions (jpg, jpeg, png).
 */
export const VALIDATOR_PATTERNS = {
  patternEmail:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  patterOnlyLetters: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/,
  patterOnlyNumber: /^[0-9]*$/,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /\d/,
  imageType: /\.(jpg|jpeg|png)$/i,
};

/**
 * Configuration for validation size limits and constraints.
 *
 * @constant
 * @type {{ maxLenghtText: number, imageWeight: number, minimunAge: number }}
 *
 * @property {number} maxLenghtText - The maximum length allowed for text fields.
 * @property {number} imageWeight - The maximum allowed weight for image files in bytes (5 MB).
 * @property {number} minimunAge - The minimum age required for users.
 */
export const VALIDATOR_SIZE = {
  maxLenghtText: 600,
  imageWeight: 5242880 /* 5Mb */,
  minimunAge: 18,
};

/**
 * Configuration for permitted image formats.
 *
 * @constant
 * @type {{ imagePermittedFormat: string, imagePermittedFormatValidator: string[] }}
 *
 * @property {string} imagePermittedFormat - Comma-separated list of allowed image MIME types.
 * @property {string[]} imagePermittedFormatValidator - Array of allowed image file extensions.
 */
export const IMAGE_FORMAT = {
  imagePermittedFormat: 'image/jpg, image/jpeg, image/png',
  imagePermittedFormatValidator: ['jpg', 'jpeg', 'png'],
};

/**
 * Configuration for the maximum number of interests allowed.
 *
 * @constant
 * @type {{ maxInterest: number }}
 *
 * @property {number} maxInterest - The maximum number of interests a user can select.
 */
export const VALIDATOR_INTEREST = {
  maxInterest: 5,
};

/**
 * Configuration for password length validation.
 *
 * @constant
 * @type {{ minLength: number }}
 *
 * @property {number} minLength - The minimum length required for passwords.
 */
export const VALIDATOR_LENGTH_PASS = {
  minLength: 9,
};
