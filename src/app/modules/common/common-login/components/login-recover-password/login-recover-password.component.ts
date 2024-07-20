import {
  Component,
  DestroyRef,
  inject,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError, of, tap } from 'rxjs';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { FormService } from '../../../../../shared/services/form.service';
import {
  CUSTOM_EMAIL_PATTERN,
  CUSTOM_REQUIRED,
} from '../../../../../shared/validators/formValidator';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { CommonLoginService } from '../../services/common-login.service';

@Component({
  selector: 'fhv-login-recover-password',
  templateUrl: './login-recover-password.component.html',
  styleUrl: './login-recover-password.component.scss',
})
export class LoginRecoverPasswordComponent implements OnInit {
  readonly INPUT_TYPE = INPUT_TYPE;
  submitForm: boolean = false;
  recoverPass: FormGroup;

  protected formService: FormService = inject(FormService);
  private commonLoginService: CommonLoginService = inject(CommonLoginService);
  private spinnerGeneralService: SpinnerGeneralService = inject(
    SpinnerGeneralService
  );
  private sweetAlertService: SweetAlertService = inject(SweetAlertService);
  private translateService: TranslateService = inject(TranslateService);
  private customModalService: CustomModalService = inject(CustomModalService);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    this.recoverPass = new FormGroup(
      {
        emailRecover: new FormControl('', [
          CUSTOM_EMAIL_PATTERN,
          CUSTOM_REQUIRED,
        ]),
      },
      {
        updateOn: 'change',
      }
    );
  }

  sendEmailRecover(): void {
    this.submitForm = true;
    if (this.recoverPass.invalid) return;
    this.spinnerGeneralService.showSpinner();
    this.commonLoginService
      .recoverPass(this.recoverPass.get('emailRecover').value)
      .pipe(
        takeUntilDestroyed(this.destroy),
        tap({
          complete: () => {
            this.spinnerGeneralService.hideSpinner();
            this.sweetAlertService.alertMessageConfirm(
              this.translateService.instant(
                'common.login_page.login_recover_pass_message_succes',
                { email: this.recoverPass.get('emailRecover').value }
              ),
              SWEET_ALERT_ICON.SUCCESS
            );
            this.customModalService.closeActiveModal();
          },
        }),
        catchError((error) => {
          this.spinnerGeneralService.hideSpinner();
          this.sweetAlertService.alertMessage(
            error.error.mensaje,
            this.translateService.instant(
              'common.error.recover_password_error'
            ),
            SWEET_ALERT_ICON.ERROR
          );
          this.customModalService.closeActiveModal();
          return of(error);
        })
      )
      .subscribe();
  }
}
