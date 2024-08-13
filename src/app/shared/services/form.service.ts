import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  /**
   * Retrieves a `FormControl` from a `FormGroup` by its name.
   *
   * This method casts the control with the specified name from the provided `FormGroup` to a `FormControl`.
   * @param formGroup - The `FormGroup` instance containing the form controls.
   * @param nameformControl - The name of the form control to retrieve.
   * @returns The `FormControl` associated with the specified name.
   * @throws If the control with the specified name does not exist, it will return `null` or `undefined`.
   */
  formControl(formGroup: FormGroup, nameformControl: string): FormControl {
    return formGroup.get(nameformControl) as FormControl;
  }

  /**
   * Removes all whitespace characters from a given string.
   *
   * This method removes all spaces, tabs, and other whitespace characters from the provided string.
   * If the input is an empty or null value, it returns `null`.
   * @param word - The string from which to remove whitespace characters.
   * @returns The string without any whitespace characters, or `null` if the input is empty or null.
   */
  removeSpaces(word: string): string {
    if (!word) {
      return null;
    }
    return word.replace(/\s+/g, '');
  }
}
