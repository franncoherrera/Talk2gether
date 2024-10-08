import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { CONFIG_USER } from '../../../../../shared/models/configUser.model';
import { UserService } from '../../../../../shared/services/user.service';
import {
  CUSTOM_EMAIL_PATTERN,
  CUSTOM_FULL_AGE,
  CUSTOM_MAX_CHAR,
  CUSTOM_ONLY_LETTERS,
  CUSTOM_REQUIRED,
} from '../../../../../shared/validators/formValidator';
import { SpinnerGeneralService } from '../../../../shared/spinner/services/spinner-general.service';
import { PersonalConfigurationService } from '../../services/personal-configuration.service';

@Component({
  selector: 'fhv-personal-configuration',
  templateUrl: './personal-configuration.component.html',
  styleUrl: './personal-configuration.component.scss',
})
export class PersonalConfigurationComponent implements OnInit {
  showPersonalData: WritableSignal<boolean> = signal(true);
  personalData$: Observable<CONFIG_USER>;
  configurationForm: FormGroup;
  userId: number;

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
        tap((userId) => (this.userId = userId)),
        switchMap((userId) =>
          this.personalConfigurationService.getPersonalData(userId)
        ),
        catchError(() => {
          this.spinnerGeneralService.hideSpinner();
          this.sweetAlertService.alertMessage(
            this.translateService.instant('common.error.general_error_title'),
            this.translateService.instant(
              'common.error.general_error_description'
            ),
            SWEET_ALERT_ICON.ERROR
          );
          return EMPTY;
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
          this.spinnerGeneralService.hideSpinner();
        },
      });
  }

  changePersonalData(event: boolean): void {
    this.showPersonalData.set(event);
  }
}
