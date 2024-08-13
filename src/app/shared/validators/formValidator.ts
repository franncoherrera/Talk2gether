import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import {
  IMAGE_FORMAT,
  VALIDATOR_LENGTH_PASS,
  VALIDATOR_PATTERNS,
  VALIDATOR_SIZE,
} from '../constants/patterns';

/**
 * Validates that the value of the control is not empty.
 *
 * @param control - The form control to validate.
 * @returns An error object with a message if the value is empty, or `undefined` if it is valid.
 */
export function CUSTOM_REQUIRED(
  control: FormControl
): ValidationErrors | undefined {
  if (!!!control.value || control.value.length === 0) {
    return { errorMessage: 'common.error.required_error' };
  } else {
    return undefined;
  }
}

/**
 * Validates that the value of the control has a valid email format.
 *
 * @param control - The form control to validate.
 * @returns An error object with a message if the email format is invalid, or `undefined` if it is valid.
 */
export function CUSTOM_EMAIL_PATTERN(
  control: FormControl
): ValidationErrors | undefined {
  if (!control.value) {
    return null;
  }
  if (!VALIDATOR_PATTERNS.patternEmail.test(control.value)) {
    return { errorMessage: 'common.error.email_structure_error' };
  } else {
    return undefined;
  }
}

/**
 * Validates that the value of the control contains only numbers.
 *
 * @param control - The form control to validate.
 * @returns An error object with a message if the value contains non-numeric characters, or `undefined` if it is valid.
 */
export function CUSTOM_ONLY_NUMBER(
  control: FormControl
): ValidationErrors | undefined {
  if (!control.value) {
    return null;
  }
  if (!VALIDATOR_PATTERNS.patterOnlyNumber.test(control.value)) {
    return { errorMessage: 'common.error.general_error_only_number' };
  } else {
    return undefined;
  }
}

/**
 * Validates that the value of the control contains only letters.
 *
 * @param control - The form control to validate.
 * @returns An error object with a message if the value contains non-alphabetic characters, or `undefined` if it is valid.
 */
export function CUSTOM_ONLY_LETTERS(
  control: FormControl
): ValidationErrors | undefined {
  if (!control.value) {
    return null;
  }
  if (!VALIDATOR_PATTERNS.patterOnlyLetters.test(control.value)) {
    return { errorMessage: 'common.error.general_error_only_letters' };
  } else {
    return undefined;
  }
}

/**
 * Validates that the provided birthdate indicates a minimum age.
 *
 * @param control - The form control with the birthdate in 'YYYY-MM-DD' format.
 * @returns An error object with a message if the age is less than the required minimum, or `null` if it is valid.
 */
export function CUSTOM_FULL_AGE(control: FormControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const parts: string[] = control.value.split('-');
  const birthDate: Date = new Date(
    parseInt(parts[0], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[2], 10)
  );
  const today: Date = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() > birthDate.getDate())
  ) {
    age--;
  }
  if (age < VALIDATOR_SIZE.minimunAge) {
    return { errorMessage: 'common.error.general_error_minimun_age' };
  }
  return null;
}

/**
 * Validates that the value of the control meets password criteria.
 * The password must contain at least one uppercase letter, one lowercase letter, one number, and meet the minimum length requirement.
 *
 * @param control - The form control to validate.
 * @returns An error object with a message if the password does not meet the criteria, or `null` if it is valid.
 */
export function CUSTOM_PASS_VALIDATOR(
  control: FormControl
): ValidationErrors | undefined {
  const value = control.value;
  if (!value) {
    return null;
  }
  const hasUpperCase = VALIDATOR_PATTERNS.hasUpperCase.test(value);
  const hasLowerCase = VALIDATOR_PATTERNS.hasLowerCase.test(value);
  const hasNumber = VALIDATOR_PATTERNS.hasNumber.test(value);
  const minLength = value.length >= VALIDATOR_LENGTH_PASS.minLength;
  const passwordValid = hasUpperCase && hasLowerCase && hasNumber && minLength;
  return !passwordValid
    ? { errorMessage: 'common.error.general_error_not_valid_pass' }
    : null;
}

/**
 * Validates that the value of the control does not exceed the maximum allowed length.
 *
 * @param control - The form control to validate.
 * @returns An error object with a message if the value exceeds the maximum length, or `null` if it is valid.
 */
export function CUSTOM_MAX_CHAR(
  control: FormControl
): ValidationErrors | undefined {
  if (!control.value) {
    return null;
  }
  if (control.value && control.value.length > VALIDATOR_SIZE.maxLenghtText) {
    return { errorMessage: 'common.error.general_error_max_length_text' };
  }
  return null;
}

/**
 * Validates that the file type of the image is permitted.
 *
 * @param control - The form control with the file name or path.
 * @returns An error object with a message if the file type is not permitted, or `null` if it is valid.
 */
export function CUSTOM_IMAGE_TYPE(
  control: FormControl
): ValidationErrors | undefined {
  if (!control.value) {
    return null;
  }
  if (control.value) {
    const extension = control.value
      .substring(control.value.lastIndexOf('.') + 1)
      .toLowerCase();
    if (!IMAGE_FORMAT.imagePermittedFormatValidator.includes(extension)) {
      return { errorMessage: 'common.error.general_error_image_type' };
    }
  }
  return null;
}

/**
 * Validates that the minimum age is less than the maximum age in a form group.
 *
 * @param formGroup - The form group containing the 'minAge' and 'maxAge' controls.
 * @returns An error object with a message if the minimum age is not less than the maximum age, or if either age is missing, or `null` if valid.
 */
export function CUSTOM_AGE_RANGE(
  formGroup: FormGroup
): ValidationErrors | undefined {
  if (!formGroup.value) {
    return null;
  }
  const minAgeControl = formGroup.get('minAge');
  const maxAgeControl = formGroup.get('maxAge');
  if (!!minAgeControl.value && !!maxAgeControl.value) {
    if (minAgeControl.value >= maxAgeControl.value) {
      return { errorMessage: 'common.error.general_error_min_max_age' };
    } else {
      return null;
    }
  } else if (
    (!!minAgeControl.value && !!!maxAgeControl.value) ||
    (!!!minAgeControl.value && !!maxAgeControl.value)
  ) {
    return { errorMessage: 'common.error.general_error_min_max_age_required' };
  }
  return null;
}

/**
 * Validates that the 'password' and 'repeatPassword' controls in a form group match.
 *
 * @param formGroup - The form group containing 'password' and 'repeatPassword' controls.
 * @returns An error object with a message if the passwords do not match, or `null` if they are equal.
 */
export function CUSTOM_EQUAL_PASS(
  formGroup: FormGroup
): ValidationErrors | null {
  if (
    !formGroup.get('password')?.value ||
    !formGroup.get('repeatPassword')?.value ||
    !!formGroup.get('repeatPassword').errors
  ) {
    return null;
  }
  const password = formGroup.get('password')?.value;
  const repeatPassword = formGroup.get('repeatPassword')?.value;
  formGroup.get('password').setErrors(null);
  if (password !== repeatPassword) {
    formGroup.get('password').setErrors({
      errorMessage: 'common.error.general_error_dual_pass_equal',
    });
  }

  return null;
}
