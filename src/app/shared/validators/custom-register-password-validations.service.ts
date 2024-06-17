import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomRegisterPasswordValidationsService {
  minLengthValidation(control: FormControl): ValidationErrors | null {
    const value: string = control.value;
    /* No se puede parametrizar minLength porque esta puesto en el backend*/
    const minLength = 8;
    if (value.length < minLength) {
      return { noMinLength: true };
    }
    return null;
  }

  oneNumberValidation(control: FormControl): ValidationErrors | null {
    const value: string = control.value;
    const oneNumberRegex = new RegExp('.*[0-9].*');
    if (!oneNumberRegex.test(value)) {
      return { noOneNumber: true };
    }
    return null;
  }

  oneLowerCaseValidation(control: FormControl): ValidationErrors | null {
    const value: string = control.value;
    const oneLowerCaseCharacter = new RegExp('[a-z]');
    if (!oneLowerCaseCharacter.test(value)) {
      return { noOneLowerCaseCharacter: true };
    }
    return null;
  }

  oneUpperCaseValidation(control: FormControl): ValidationErrors | null {
    const value: string = control.value;
    const oneUpperCaseCharacter = new RegExp('[A-Z]');
    if (!oneUpperCaseCharacter.test(value)) {
      return { noOneUpperCaseCharacter: true };
    }
    return null;
  }

  oneSpecialCharacterValidation(control: FormControl): ValidationErrors | null {
    const value: string = control.value;
    const oneSpecialCharacter = new RegExp('[-_@*#]+');
    if (!oneSpecialCharacter.test(value)) {
      return { noOneSpecialCharacter: true };
    }
    return null;
  }
}

export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidator {
  public static strong(control: FormControl): ValidationResult {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let tamanio: boolean = false;

    if (control.value.length >= 8) {
      tamanio = true;
    }

    const valid = hasNumber && hasUpper && tamanio;
    if (!valid) {
      return { strong: true };
    }
    return null;
  }
}
