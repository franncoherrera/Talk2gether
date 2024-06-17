import { Component } from '@angular/core';
import {
  IMAGE_FORMAT,
  VALIDATOR_PATTERNS,
  VALIDATOR_SIZE,
} from '../../../../../shared/constants/patterns';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../../../../../shared/validators/custom-register-password-validations.service';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { FormService } from '../../../../../shared/services/form.service';

@Component({
  selector: 'fhv-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  submitForm: boolean = false;
  INPUT_TYPE = INPUT_TYPE;
  // Constant
  IMAGE_FORMAT = IMAGE_FORMAT;

  
  patternEmail = VALIDATOR_PATTERNS;
  validatorSize = VALIDATOR_SIZE;
  // Validaciones
  emptyDate: boolean = true;

  registerForm: FormGroup;

  constructor(protected formService: FormService){}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        userName: new FormControl('', [
          Validators.required,
          Validators.pattern(VALIDATOR_PATTERNS.patterOnlyLetters),
        ]),
        userSurname: new FormControl('', [
          Validators.required,
          Validators.pattern(VALIDATOR_PATTERNS.patterOnlyLetters),
        ]),
        dateBorn: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.pattern(this.patternEmail.patternEmail),
          Validators.required,
        ]),
        password: new FormControl('', [
          Validators.required,
          PasswordValidator.strong,
        ]),
        repeatPassword: new FormControl('', [Validators.required]),

        country: new FormControl('', [Validators.required]),
        nativeLanguage: new FormControl('', [Validators.required]),
        urlPhoto: new FormControl('', [Validators.required]),
        descriptionUser: new FormControl('', [
          Validators.maxLength(this.validatorSize.maxLenghtText),
        ]),
        terms: new FormControl('', [Validators.required]),
        learnLanguage: new FormControl('', [Validators.required]),
        languageLevel: new FormControl('', [Validators.required]),
        interest: new FormControl('', [Validators.required]),
      },
      {
        updateOn: 'change',
      }
    );

    // const nacimiento = document.getElementById('dateBorn') as HTMLInputElement;
    // let today = new Date();
    // nacimiento.max = new Date(
    //   today.getFullYear() - this.validatorSize.minimunAge,
    //   today.getMonth(),
    //   today.getDate()
    // )
    //   .toISOString()
    //   .split('T')[0];

  }

  // Método para validar la fecha y disparar errores
  selectDate(): void {
    this.registerForm.get('dateBorn').markAsTouched();
    const inputFecha = document.getElementById('dateBorn') as HTMLInputElement;
    inputFecha.oninput = () => {
      const fechaSeleccionada = inputFecha.value;
      if (fechaSeleccionada != '') {
        this.emptyDate = false;
        this.registerForm.get('dateBorn').setErrors(null);
        this.registerForm.get('dateBorn').setValue(inputFecha.value);
      } else {
        this.emptyDate = true;
        this.registerForm.get('dateBorn').setErrors({ required: true });
      }
    };
  }

}
