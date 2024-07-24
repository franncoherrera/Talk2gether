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
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatest, finalize, map, Observable } from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { IMAGE_FORMAT } from '../../../../../shared/constants/patterns';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { REGISTER_PARAMETERS } from '../../../../../shared/models/parameter.model';
import { FormService } from '../../../../../shared/services/form.service';
import { ParameterService } from '../../../../../shared/services/parameter.service';
import { FormErrorComponent } from '../../../../shared/form-error/form-error.component';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { InterestLabelComponent } from '../../../../shared/interest-label/interest-label.component';
import { SelectFormComponent } from '../../../../shared/select-form/select-form.component';
import { SpinnerGeneralModule } from '../../../../shared/spinner-general/spinner-general.module';
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
  readonly INPUT_TYPE = INPUT_TYPE;
  readonly IMAGE_FORMAT = IMAGE_FORMAT;
  readonly ICON_CLASS = ICON_CLASS;
  protected formService: FormService = inject(FormService);
  protected personalConfigurationService: PersonalConfigurationService = inject(
    PersonalConfigurationService
  );
  protected parameterService: ParameterService = inject(ParameterService);
  private readonly destroy: DestroyRef = inject(DestroyRef);

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
    this.prevForm = this.formGroup().getRawValue();
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);
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
    if (this.isFormModified()) {
      this.personalConfigurationService
        .editUser(this.userId(), this.buildUser())
        .pipe(
          takeUntilDestroyed(this.destroy),
          finalize(() => this.backConfiguration())
        )
        .subscribe();
    } else {
      this.backConfiguration();
    }
  }

  buildUser() {
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
      urlFoto: this.prevImage,
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
}
