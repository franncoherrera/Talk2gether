import { Location, TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { getDownloadURL } from '@firebase/storage';
import {
  Observable,
  Subject,
  catchError,
  combineLatest,
  map,
  of,
  takeUntil,
  tap,
} from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { CUSTOM_MODAL_CONFIG } from '../../../../../shared/constants/customModalRefConfig';
import { IMAGE_FORMAT } from '../../../../../shared/constants/patterns';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import {
  INTEREST,
  REGISTER_PARAMETERS,
} from '../../../../../shared/models/parameter.model';
import { USER } from '../../../../../shared/models/user.model';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { FormService } from '../../../../../shared/services/form.service';
import { ParameterService } from '../../../../../shared/services/parameter.service';
import {
  CUSTOM_EMAIL_PATTERN,
  CUSTOM_FULL_AGE,
  CUSTOM_IMAGE_TYPE,
  CUSTOM_MAX_CHAR,
  CUSTOM_ONLY_LETTERS,
  CUSTOM_REQUIRED,
} from '../../../../../shared/validators/formValidator';
import { InterestModalComponent } from '../../../../shared/interest-modal/interest-modal.component';
import { CommonRegisterService } from '../../services/common-register.service';
import { LanguageLevelModalComponent } from '../language-level-modal/language-level-modal.component';
import { Router } from '@angular/router';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { TranslateService } from '@ngx-translate/core';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import {
  SWEET_ALERT_ICON,
  SWEET_ALERT_POSITION,
} from '../../../../../shared/enums/sweeAlert.enum';

@Component({
  selector: 'fhv-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  readonly INPUT_TYPE = INPUT_TYPE;
  readonly IMAGE_FORMAT = IMAGE_FORMAT;
  readonly ICON_CLASS = ICON_CLASS;
  readonly ROUTES_PATH = ROUTES_PATH;
  private firebaseStorage: Storage = inject(Storage);
  private unsubscribe$: Subject<void> = new Subject<void>();
  registerForm: FormGroup;
  parametersList$: Observable<REGISTER_PARAMETERS>;
  submitForm: boolean = false;
  loadModal: boolean = false;
  fileSelected: File;

  constructor(
    protected formService: FormService,
    private parameterService: ParameterService,
    private registerService: CommonRegisterService,
    private customModalService: CustomModalService,
    private titleCase: TitleCasePipe,
    private location: Location,
    private router: Router,
    private spinnerGeneralServide: SpinnerGeneralService,
    private sweetAlertService: SweetAlertService,
    private translateService: TranslateService
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
    this.submitForm = true;
    if (this.registerForm.invalid) return;
    this.uploadFile(this.fileSelected);
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileSelected = input.files[0];
    }
  }

  async uploadFile(file: File) {
    this.spinnerGeneralServide.showSpinner();
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
        this.spinnerGeneralServide.hideSpinner();
        this.sweetAlertService.alertTimer(
          this.translateService.instant('common.error.general_error_upload'),
          SWEET_ALERT_POSITION.TOP_RIGHT,
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
        this.registerService
          .registerUser(this.createUser(url))
          .pipe(
            takeUntil(this.unsubscribe$),
            tap({
              complete: () => {
                this.spinnerGeneralServide.hideSpinner();
                this.sweetAlertService.alertTimer(
                  this.translateService.instant(
                    'common.register_page.user_registered'
                  ),
                  SWEET_ALERT_POSITION.TOP_RIGHT,
                  SWEET_ALERT_ICON.SUCCESS
                );
                this.router.navigate([ROUTES_PATH.LOGIN_PATH]);
              },
            }),
            catchError((error) => {
              this.spinnerGeneralServide.hideSpinner();
              this.sweetAlertService.alertMessage(
                error.error.mensaje,
                this.translateService.instant('common.error.register_error'),
                SWEET_ALERT_ICON.ERROR
              );
              return of(error);
            })
          )
          .subscribe();
      }
    );
  }

  createUser(urlPhoto: string): USER {
    let user: USER;
    this.interestListRefactor();
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
      nombrePais: this.removeSpaces(this.registerForm.get('country').value),
      nombreIdiomaNativo: this.removeSpaces(
        this.registerForm.get('nativeLanguage').value
      ),
      urlFoto: urlPhoto,
      descripcion: this.registerForm.get('descriptionUser').value,
      nombreIdiomaAprendiz: this.removeSpaces(
        this.registerForm.get('learnLanguage').value
      ),
      nombreNivelIdiomaAprendiz: this.removeSpaces(
        this.registerForm.get('languageLevel').value
      ),
      nombreIntereses: this.interestListRefactor(),
    };
    return user;
  }

  removeSpaces(word: string): string {
    return word.replace(/\s+/g, '');
  }

  interestListRefactor(): string[] {
    const interestControl = this.registerForm.get('interest');
    if (interestControl && Array.isArray(interestControl.value)) {
      const interestArray: string[] = interestControl.value.map(
        (item: { name: string }) => item.name
      );
      return interestArray;
    }
    return null;
  }

  openInterestModal(): void {
    const modalRef = this.customModalService.open(
      InterestModalComponent,
      CUSTOM_MODAL_CONFIG
    );
    modalRef.componentInstance.control = this.registerForm.get('interest');
  }

  openLevelLanguageModal(): void {
    this.customModalService.open(
      LanguageLevelModalComponent,
      CUSTOM_MODAL_CONFIG
    );
  }

  deleteInterest(interestName: string): void {
    const interestArray: INTEREST = this.registerForm
      .get('interest')
      .value.filter((value: INTEREST) => value.name !== interestName);
    this.registerForm.get('interest').setValue(interestArray);
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
