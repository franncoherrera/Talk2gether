import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IMAGE_FORMAT } from '../../../../../shared/constants/patterns';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { FormService } from '../../../../../shared/services/form.service';
import {
  CUSTOM_EMAIL_PATTERN,
  CUSTOM_FULL_AGE,
  CUSTOM_IMAGE_TYPE,
  CUSTOM_MAX_CHAR,
  CUSTOM_ONLY_LETTERS,
  CUSTOM_REQUIRED,
} from '../../../../../shared/validators/formValidator';
import { Observable, combineLatest, map } from 'rxjs';
import { ParameterService } from '../../../../../shared/services/parameter.service';
import {
  INTEREST,
  REGISTER_PARAMETERS,
} from '../../../../../shared/models/parameter.model';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { InterestModalComponent } from '../../../../shared/interest-modal/interest-modal.component';
import { CUSTOM_MODAL_CONFIG } from '../../../../../shared/constants/customModalRefConfig';
import { LanguageLevelModalComponent } from '../language-level-modal/language-level-modal.component';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';

@Component({
  selector: 'fhv-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  readonly INPUT_TYPE = INPUT_TYPE;
  readonly IMAGE_FORMAT = IMAGE_FORMAT;
  readonly ICON_CLASS = ICON_CLASS;
  readonly ROUTES_PATH = ROUTES_PATH;
  registerForm: FormGroup;
  parametersList$: Observable<REGISTER_PARAMETERS>;
  submitForm: boolean = false;
  loadModal: boolean = false;

  constructor(
    protected formService: FormService,
    private parameterService: ParameterService,
    private customModalService: CustomModalService
  ) {}

  ngOnInit(): void {
    this.parametersList$ = combineLatest([
      this.parameterService.getActiveCountries(),
      this.parameterService.getActiveLanguages(),
      this.parameterService.getActiveLanguageLevel(),
    ]).pipe(
      map(([countryList, languageList, languageLevelList]) => {
        return {
          countryList,
          languageList,
          languageLevelList,
        };
      })
    );
    this.registerForm = new FormGroup(
      {
        userName: new FormControl('', [CUSTOM_REQUIRED, CUSTOM_ONLY_LETTERS]),
        userSurname: new FormControl('', [
          CUSTOM_REQUIRED,
          CUSTOM_ONLY_LETTERS,
        ]),
        dateBorn: new FormControl('', [CUSTOM_REQUIRED, CUSTOM_FULL_AGE]),
        country: new FormControl('', [CUSTOM_REQUIRED]),
        nativeLanguage: new FormControl('', [CUSTOM_REQUIRED]),
        //TODO validate size image file
        urlPhoto: new FormControl('', [CUSTOM_REQUIRED, CUSTOM_IMAGE_TYPE]),
        email: new FormControl('', [CUSTOM_REQUIRED, CUSTOM_EMAIL_PATTERN]),
        password: new FormControl('', [CUSTOM_REQUIRED]),
        repeatPassword: new FormControl('', [CUSTOM_REQUIRED]),
        learnLanguage: new FormControl('', [CUSTOM_REQUIRED]),
        languageLevel: new FormControl('', [CUSTOM_REQUIRED]),
        descriptionUser: new FormControl('', [
          CUSTOM_REQUIRED,
          CUSTOM_MAX_CHAR,
        ]),
        interest: new FormControl('', [CUSTOM_REQUIRED]),

        terms: new FormControl('', [CUSTOM_REQUIRED]),
      },
      {
        updateOn: 'change',
      }
    );
  }

  registerUser(): void {
    console.log(this.registerForm);
    this.submitForm = true;
    if (this.registerForm.invalid) return;
  }

  openInterestModal(): void {
    const modalRef = this.customModalService.open(
      InterestModalComponent,
      CUSTOM_MODAL_CONFIG
    );
    modalRef.componentInstance.control = this.registerForm.get('interest');
  }

  openLevelLanguageModal(): void {
    this.customModalService.open(LanguageLevelModalComponent, CUSTOM_MODAL_CONFIG);
  }

  deleteInterest(interestName: string): void {
    const interestArray: INTEREST = this.registerForm
      .get('interest')
      .value.filter((value: INTEREST) => value.name !== interestName);
    this.registerForm.get('interest').setValue(interestArray);
  }
}
