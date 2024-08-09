import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import {
  IMAGE_FORMAT,
  VALIDATOR_LENGTH_PASS,
  VALIDATOR_PATTERNS,
  VALIDATOR_SIZE,
} from '../constants/patterns';

export function CUSTOM_REQUIRED(
  control: FormControl
): ValidationErrors | undefined {
  if (!!!control.value || control.value.length === 0) {
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
