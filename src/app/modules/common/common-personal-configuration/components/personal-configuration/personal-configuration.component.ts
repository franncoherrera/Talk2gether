import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { CONFIG_USER } from '../../../../../shared/models/configUser.model';
import { UserService } from '../../../../../shared/services/user.service';
import {
  CUSTOM_EMAIL_PATTERN,
  CUSTOM_FULL_AGE,
  CUSTOM_IMAGE_TYPE,
  CUSTOM_MAX_CHAR,
  CUSTOM_ONLY_LETTERS,
  CUSTOM_REQUIRED,
} from '../../../../../shared/validators/formValidator';
import { PersonalConfigurationService } from '../../services/personal-configuration.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { TranslateService } from '@ngx-translate/core';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';

@Component({
  selector: 'fhv-personal-configuration',
  templateUrl: './personal-configuration.component.html',
  styleUrl: './personal-configuration.component.scss',
})
export class PersonalConfigurationComponent implements OnInit {
  showPersonalData: WritableSignal<boolean> = signal(true);
  personalData$: Observable<CONFIG_USER>;
  configurationForm: FormGroup;

  private personalConfigurationService: PersonalConfigurationService = inject(
    PersonalConfigurationService
  );
  private userService: UserService = inject(UserService);
  private readonly destroy: DestroyRef = inject(DestroyRef);
  private spinnerGeneralService = inject(SpinnerGeneralService);
  private sweetAlertService = inject(SweetAlertService);
  private translateService = inject(TranslateService);

  ngOnInit() {
    this.spinnerGeneralService.showSpinner();
    this.userService
      .getIdUser()
      .pipe(
        takeUntilDestroyed(this.destroy),
        switchMap((userId) =>
          this.personalConfigurationService.getPersonalData(userId)
        ),
        catchError(() => {
          this.spinnerGeneralService.hideSpinner()
          this.sweetAlertService.alertMessage(
            this.translateService.instant('common.error.general_error_title'),
            this.translateService.instant(
              'common.error.general_error_description'
            ),
            SWEET_ALERT_ICON.ERROR
          );
          return of(null);
        })
      )
      .subscribe({
        next: (personalData) => {
          this.configurationForm = new FormGroup(
            {
              email: new FormControl(personalData.correo, [
                CUSTOM_REQUIRED,
                CUSTOM_EMAIL_PATTERN,
              ]),
              userName: new FormControl(personalData.nombreUsuario, [
                CUSTOM_REQUIRED,
                CUSTOM_ONLY_LETTERS,
              ]),
              userSurname: new FormControl(personalData.apellidoUsuario, [
                CUSTOM_REQUIRED,
                CUSTOM_ONLY_LETTERS,
              ]),
              dateBorn: new FormControl(personalData.fechaNacimiento, [
                CUSTOM_REQUIRED,
                CUSTOM_FULL_AGE,
              ]),
              country: new FormControl(personalData.nombrePais, [
                CUSTOM_REQUIRED,
              ]),
              //TODO validate size image file
              urlPhoto: new FormControl(personalData.urlFoto, [
                CUSTOM_REQUIRED,
                CUSTOM_IMAGE_TYPE,
              ]),
              learnLanguage: new FormControl(
                personalData.nombreIdiomaAprender,
                [CUSTOM_REQUIRED]
              ),
              languageLevel: new FormControl(personalData.nombreNivelIdioma, [
                CUSTOM_REQUIRED,
              ]),
              nativeLanguage: new FormControl(personalData.nombreIdiomaNativo, [
                CUSTOM_REQUIRED,
              ]),
              descriptionUser: new FormControl(personalData.descripcion, [
                CUSTOM_REQUIRED,
                CUSTOM_MAX_CHAR,
              ]),
              interest: new FormControl(personalData.listaIntereses, [
                CUSTOM_REQUIRED,
              ]),
            },
            {
              updateOn: 'change',
            }
          );
          this.spinnerGeneralService.hideSpinner()
        },
      });
  }

  changePersonalData(event: boolean): void {
    this.showPersonalData.set(event);
  }
}
