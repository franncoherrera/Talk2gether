import { FormControl, ValidationErrors } from '@angular/forms';
import {
  IMAGE_FORMAT,
  VALIDATOR_PATTERNS,
  VALIDATOR_SIZE,
} from '../constants/patterns';

export function CUSTOM_REQUIRED(
  control: FormControl
): ValidationErrors | undefined {
  if (!!!control.value) {
    return { errorMessage: 'common.error.required_error' };
  } else {
    return undefined;
  }
}

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

export function CUSTOM_FULL_AGE(
  control: FormControl
): ValidationErrors | undefined {
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

