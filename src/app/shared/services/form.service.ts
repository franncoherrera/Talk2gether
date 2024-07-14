import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  formControl(formGroup: FormGroup, nameformControl: string): FormControl {
    return formGroup.get(nameformControl) as FormControl;
  }

  removeSpaces(word: string): string {
    if(!!!word){
      return null
    }
    return word.replace(/\s+/g, '');
  }
}
