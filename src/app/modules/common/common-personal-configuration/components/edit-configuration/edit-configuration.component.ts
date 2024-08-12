import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  catchError,
  combineLatest,
  EMPTY,
  finalize,
  map,
  Observable,
} from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { IMAGE_FORMAT } from '../../../../../shared/constants/patterns';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { REGISTER_PARAMETERS } from '../../../../../shared/models/parameter.model';
import { FormService } from '../../../../../shared/services/form.service';
import { ParameterService } from '../../../../../shared/services/parameter.service';
import { UserCometChatService } from '../../../../../shared/services/user-comet-chat.service';
import { FormErrorComponent } from '../../../../shared/form-error/form-error.component';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { InterestLabelComponent } from '../../../../shared/interest-label/interest-label.component';
import { SelectFormComponent } from '../../../../shared/select-form/select-form.component';
import { SpinnerGeneralModule } from '../../../../shared/spinner/componentes/spinner-general/spinner-general.module';
import { SpinnerGeneralService } from '../../../../shared/spinner/services/spinner-general.service';
import { TextAreaFormComponent } from '../../../../shared/text-area-form/text-area-form.component';
import { PersonalConfigurationService } from '../../services/personal-configuration.service';

@Component({
  selector: 'fhv-edit-configuration',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    InterestLabelComponent,
    InputFormComponent,
    SpinnerGeneralModule,
    SelectFormComponent,
    TextAreaFormComponent,
    ReactiveFormsModule,
    RouterModule,
    FormErrorComponent,
  ],
  templateUrl: './edit-configuration.component.html',
  styleUrl: './edit-configuration.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EditConfigurationComponent implements OnInit {
  formGroup = input.required<FormGroup>();
  userId = input.required<number>();
  submitForm: boolean = false;
  parametersList$: Observable<REGISTER_PARAMETERS>;
  imageSrc: string | ArrayBuffer | null = null;
  prevImage: string;
  prevForm: FormGroup;
  fileSelected: File;
  readonly INPUT_TYPE = INPUT_TYPE;
  readonly IMAGE_FORMAT = IMAGE_FORMAT;
  readonly ICON_CLASS = ICON_CLASS;
  private firebaseStorage: Storage = inject(Storage);
  protected formService: FormService = inject(FormService);
  protected personalConfigurationService: PersonalConfigurationService = inject(
    PersonalConfigurationService
  );
  protected parameterService: ParameterService = inject(ParameterService);
  private readonly destroy: DestroyRef = inject(DestroyRef);
  private readonly spinnerGeneralService: SpinnerGeneralService = inject(
    SpinnerGeneralService
  );
  private readonly sweetAlertService: SweetAlertService =
    inject(SweetAlertService);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly userCometChatService: UserCometChatService =
    inject(UserCometChatService);

  ngOnInit() {
    this.initImage();
    this.initForm();
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
  }
  initImage() {
    this.prevImage = this.formGroup().get('urlPhoto').value;
  }
  initForm() {
    this.prevForm = JSON.parse(JSON.stringify(this.formGroup().getRawValue()));
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.fileSelected = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.fileSelected);
    }
  }

  backConfiguration(): void {
    window.location.reload();
  }

  isFormModified(): boolean {
    return (
      JSON.stringify(this.formGroup().getRawValue()) !==
      JSON.stringify(this.prevForm)
    );
  }

  editUser(): void {
    this.submitForm = true;
    if (this.formGroup().invalid) return;
    if (!!this.fileSelected) {
      this.uploadFile(this.fileSelected);
    } else if (this.isFormModified()) {
      this.spinnerGeneralService.showSpinner();
      this.sendEditUser();
    } else {
      this.backConfiguration();
    }
  }

  sendEditUser(urlPhoto?: string): void {
    combineLatest([
      this.personalConfigurationService.editUser(
        this.userId(),
        this.buildUser(!!urlPhoto ? urlPhoto : this.prevImage)
      ),
      this.userCometChatService.updateUserCometChat(
        this.userId().toString(),
        this.buildNameCometChat(),
        !!urlPhoto ? urlPhoto : this.prevImage
      ),
    ])
      .pipe(
        takeUntilDestroyed(this.destroy),
        catchError(() => {
          this.sweetAlertService.alertImpromptu({
            title: "'El usuario fue asd'",
            icon: SWEET_ALERT_ICON.ERROR,
          });
          return EMPTY;
        }),
        finalize(() => {
          this.spinnerGeneralService.hideSpinner();
          this.backConfiguration();
        })
      )
      .subscribe();
  }

  buildNameCometChat(): string {
    return (
      this.formGroup().get('userName').value +
      ' ' +
      this.formGroup().get('userSurname').value
    );
  }

  buildUser(urPhoto: string) {
    return {
      nombreUsuario: this.formGroup().get('userName').value,
      apellidoUsuario: this.formGroup().get('userSurname').value,
      fechaNacimiento: this.formGroup().get('dateBorn').value,
      nombrePais: this.formService.removeSpaces(
        this.formGroup().get('country').value
      ),
      nombreIdiomaNativo: this.formService.removeSpaces(
        this.formGroup().get('nativeLanguage').value
      ),
      urlFoto: !!urPhoto ? urPhoto : this.prevImage,
      descripcion: this.formGroup().get('descriptionUser').value,
      nombreIdiomaAprendiz: this.formService.removeSpaces(
        this.formGroup().get('learnLanguage').value
      ),
      nombreNivelIdiomaAprendiz: this.formService.removeSpaces(
        this.formGroup().get('languageLevel').value
      ),
      nombreIntereses: this.parameterService.interestListRefactor(
        this.formGroup(),
        'interest'
      ),
    };
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
        this.sendEditUser(url);
      }
    );
  }
}
