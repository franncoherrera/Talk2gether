import { Component, OnDestroy, OnInit } from '@angular/core';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CUSTOM_EMAIL_PATTERN,
  CUSTOM_REQUIRED,
} from '../../../../../shared/validators/formValidator';
import { FormService } from '../../../../../shared/services/form.service';
import { CommonLoginService } from '../../services/common-login.service';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { TranslateService } from '@ngx-translate/core';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';

@Component({
  selector: 'fhv-login-recover-password',
  templateUrl: './login-recover-password.component.html',
  styleUrl: './login-recover-password.component.scss',
})
export class LoginRecoverPasswordComponent implements OnInit, OnDestroy {
  readonly INPUT_TYPE = INPUT_TYPE;
  submitForm: boolean = false;
  recoverPass: FormGroup;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    protected formService: FormService,
    private commonLoginService: CommonLoginService,
    private spinnerGeneralService: SpinnerGeneralService,
    private sweetAlertService: SweetAlertService,
    private translateService: TranslateService,
    private customModalService: CustomModalService
  ) {}

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
    this.sweetAlertService.alertMessageConfirm(
      this.translateService.instant(
        'common.login_page.login_recover_pass_message_succes',
        { email: this.recoverPass.get('emailRecover').value }
      ),
      SWEET_ALERT_ICON.SUCCESS
    );
    this.customModalService.closeActiveModal();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
