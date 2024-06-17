import { FormControl, ValidationErrors } from '@angular/forms';
import { VALIDATOR_PATTERNS } from '../constants/patterns';

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
  if (!VALIDATOR_PATTERNS.patternEmail.test(control.value)) {
    return { errorMessage: 'common.error.email_structure_error' };
  } else {
    return undefined;
  }
}
