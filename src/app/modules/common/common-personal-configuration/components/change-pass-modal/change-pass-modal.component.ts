import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { SesionService } from '../../../../../shared/interceptors/sesion.service';
import { CHANGE_PASS } from '../../../../../shared/models/changePassWord.model';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { FormService } from '../../../../../shared/services/form.service';
import { UserService } from '../../../../../shared/services/user.service';
import {
  CUSTOM_EQUAL_PASS,
  CUSTOM_PASS_VALIDATOR,
  CUSTOM_REQUIRED,
} from '../../../../../shared/validators/formValidator';
import { ModalComponent } from '../../../../shared/bootstrap-modal/bootstrap-modal.component';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { PersonalConfigurationService } from '../../services/personal-configuration.service';

@Component({
  selector: 'fhv-change-pass-modal',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    TranslateModule,
    InputFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './change-pass-modal.component.html',
  styleUrl: './change-pass-modal.component.scss',
})
export class ChangePassModalComponent implements OnInit {
  changePassWordForm: FormGroup;
  submitForm: boolean;
  readonly INPUT_TYPE = INPUT_TYPE;

  protected readonly formService: FormService = inject(FormService);
  private readonly personalConfigurationService: PersonalConfigurationService =
    inject(PersonalConfigurationService);
  private readonly userService: UserService = inject(UserService);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly router: Router = inject(Router);
  private readonly spinnerGeneralService: SpinnerGeneralService = inject(
    SpinnerGeneralService
  );
  private readonly sesionService: SesionService = inject(SesionService);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly customModalService: CustomModalService =
    inject(CustomModalService);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    this.changePassWordForm = new FormGroup(
      {
        actualPass: new FormControl('', [CUSTOM_REQUIRED]),
        password: new FormControl('', [CUSTOM_REQUIRED, CUSTOM_PASS_VALIDATOR]),
        repeatPassword: new FormControl('', [
          CUSTOM_REQUIRED,
          CUSTOM_PASS_VALIDATOR,
        ]),
      },
      {
        updateOn: 'change',
        validators: [CUSTOM_EQUAL_PASS],
      }
    );
  }

  changePassword(): void {
    this.submitForm = true;
    if (this.changePassWordForm.invalid) return;
    this.spinnerGeneralService.showSpinner();
    this.handleChangePassword();
  }

  handleChangePassword(): void {
    this.userService
      .getIdUser()
      .pipe(
        takeUntilDestroyed(this.destroy),
        switchMap((idUser) =>
          this.personalConfigurationService
            .changePassword(this.buildBody(idUser))
            .pipe(
              catchError((error) => {
                this.sweetAlertService.alertImpromptu({
                  title: error.error.mensaje,
                  icon: SWEET_ALERT_ICON.ERROR,
                });
                this.spinnerGeneralService.hideSpinner();
                return EMPTY;
              }),
              tap(() => {
                this.spinnerGeneralService.hideSpinner();
                this.customModalService.dismissActiveModal();
                this.sesionService.clearLocalSession();
                this.router.navigate([ROUTES_PATH.LOGIN_PATH]);
                this.sweetAlertService.alertImpromptu({
                  title: this.translateService.instant(
                    'common.change_pass_modal.change_pass_modal_message_ok'
                  ),
                  icon: SWEET_ALERT_ICON.SUCCESS,
                });
              })
            )
        )
      )
      .subscribe();
  }

  buildBody(idUser: number): CHANGE_PASS {
    return {
      id: idUser,
      contraseniaNueva: this.changePassWordForm.get('password').value,
      contraseniaAntigua: this.changePassWordForm.get('actualPass').value,
    };
  }
}
