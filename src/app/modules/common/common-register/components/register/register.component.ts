import { TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDownloadURL } from '@firebase/storage';
import { TranslateService } from '@ngx-translate/core';
import { Observable, catchError, combineLatest, map, of, tap } from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { IMAGE_FORMAT } from '../../../../../shared/constants/patterns';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { REGISTER_PARAMETERS } from '../../../../../shared/models/parameter.model';
import { USER } from '../../../../../shared/models/user.model';
import { FormService } from '../../../../../shared/services/form.service';
import { GeneralService } from '../../../../../shared/services/general.service';
import { ParameterService } from '../../../../../shared/services/parameter.service';
import {
  CUSTOM_EMAIL_PATTERN,
  CUSTOM_EQUAL_PASS,
  CUSTOM_FULL_AGE,
  CUSTOM_MAX_CHAR,
  CUSTOM_ONLY_LETTERS,
  CUSTOM_PASS_VALIDATOR,
  CUSTOM_REQUIRED,
} from '../../../../../shared/validators/formValidator';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { CommonRegisterService } from '../../services/common-register.service';

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
  private firebaseStorage: Storage = inject(Storage);
  registerForm: FormGroup;
  parametersList$: Observable<REGISTER_PARAMETERS>;
  submitForm: boolean = false;
  loadModal: boolean = false;
  fileSelected: File;
  referralCode: string | null = null;

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  protected readonly formService: FormService = inject(FormService);
  protected readonly parameterService: ParameterService =
    inject(ParameterService);
  private readonly registerService: CommonRegisterService = inject(
    CommonRegisterService
  );
  private readonly titleCase: TitleCasePipe = inject(TitleCasePipe);
  private readonly router: Router = inject(Router);
  private readonly spinnerGeneralService: SpinnerGeneralService = inject(
    SpinnerGeneralService
  );
  private readonly sweetAlertService: SweetAlertService =
    inject(SweetAlertService);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  protected readonly generalService: GeneralService = inject(GeneralService);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((params) => {
        this.referralCode = params['referido'];
      });
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
        urlPhoto: new FormControl('', [CUSTOM_REQUIRED]),
        email: new FormControl('', [CUSTOM_REQUIRED, CUSTOM_EMAIL_PATTERN]),
        password: new FormControl('', [CUSTOM_REQUIRED, CUSTOM_PASS_VALIDATOR]),
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
        validators: [CUSTOM_EQUAL_PASS]
      }
    );
  }

  registerUser(): void {
    this.submitForm = true;
    if (this.registerForm.invalid) return;
    this.uploadFile(this.fileSelected);
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileSelected = input.files[0];
    }
  }

  async uploadFile(file: File) {
    this.spinnerGeneralService.showSpinner();
    const filePath = `images/${file.name}`;
    const fileRef = ref(this.firebaseStorage, filePath);
    const uploadFile = uploadBytesResumable(fileRef, file);
    uploadFile.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        this.spinnerGeneralService.hideSpinner();
        this.sweetAlertService.alertMessageConfirm(
          this.translateService.instant('common.error.general_error_upload'),
          SWEET_ALERT_ICON.ERROR
        );
      },
      async () => {
        const delay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        const delayedGetDownloadURL = async (fileRef: any) => {
          await delay(4000);
          return getDownloadURL(fileRef);
        };
        const url = await delayedGetDownloadURL(fileRef);
        if (!!this.referralCode) {
          this.registerService
            .registerUserReferral(this.createUser(url), this.referralCode)
            .pipe(
              takeUntilDestroyed(this.destroy),
              tap({
                complete: () => {
                  this.completeRegister();
                },
              }),
              catchError((error) => {
                this.errorRegister(error);
                return of(error);
              })
            )
            .subscribe();
        } else {
          this.registerService
            .registerUser(this.createUser(url))
            .pipe(
              takeUntilDestroyed(this.destroy),
              tap({
                complete: () => {
                  this.completeRegister();
                },
              }),
              catchError((error) => {
                this.errorRegister(error);
                return of(error);
              })
            )
            .subscribe();
        }
      }
    );
  }

  completeRegister(): void {
    this.spinnerGeneralService.hideSpinner();
    this.sweetAlertService.alertMessageConfirm(
      this.translateService.instant('common.register_page.user_registered'),
      SWEET_ALERT_ICON.SUCCESS
    );
    this.router.navigate([ROUTES_PATH.LOGIN_PATH]);
  }

  errorRegister(error): void {
    this.spinnerGeneralService.hideSpinner();
    this.sweetAlertService.alertMessage(
      error.error.mensaje,
      this.translateService.instant('common.error.register_error'),
      SWEET_ALERT_ICON.ERROR
    );
  }

  createUser(urlPhoto: string): USER {
    let user: USER;
    user = {
      nombreUsuario: this.titleCase.transform(
        this.registerForm.get('userName').value
      ),
      apellidoUsuario: this.titleCase.transform(
        this.registerForm.get('userSurname').value
      ),
      fechaNacimiento: this.registerForm.get('dateBorn').value,
      correo: this.registerForm.get('email').value,
      contrasenia: this.registerForm.get('password').value,
      nombrePais: this.formService.removeSpaces(
        this.registerForm.get('country').value
      ),
      nombreIdiomaNativo: this.formService.removeSpaces(
        this.registerForm.get('nativeLanguage').value
      ),
      urlFoto: urlPhoto,
      descripcion: this.registerForm.get('descriptionUser').value,
      nombreIdiomaAprendiz: this.formService.removeSpaces(
        this.registerForm.get('learnLanguage').value
      ),
      nombreNivelIdiomaAprendiz: this.formService.removeSpaces(
        this.registerForm.get('languageLevel').value
      ),
      nombreIntereses: this.parameterService.interestListRefactor(
        this.registerForm,
        'interest'
      ),
    };
    return user;
  }
}
