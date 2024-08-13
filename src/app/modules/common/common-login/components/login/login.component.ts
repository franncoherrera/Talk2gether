import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { CUSTOM_MODAL_CONFIG } from '../../../../../shared/constants/customModalRefConfig';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { TOKEN_SESSION } from '../../../../../shared/models/tokenSession.model';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { FormService } from '../../../../../shared/services/form.service';
import { UserService } from '../../../../../shared/services/user.service';
import {
  CUSTOM_EMAIL_PATTERN,
  CUSTOM_REQUIRED,
} from '../../../../../shared/validators/formValidator';
import { SpinnerGeneralService } from '../../../../shared/spinner/services/spinner-general.service';
import { CommonLoginService } from '../../services/common-login.service';
import { LoginRecoverPasswordComponent } from '../login-recover-password/login-recover-password.component';

@Component({
  selector: 'fhv-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitForm: boolean = false;
  submitError: boolean = false;
  readonly INPUT_TYPE = INPUT_TYPE;

  private router = inject(Router);
  private commonLoginService = inject(CommonLoginService);
  private spinnerGeneralService = inject(SpinnerGeneralService);
  private sweetAlertService = inject(SweetAlertService);
  private translateService = inject(TranslateService);
  protected formService = inject(FormService);
  private customModalService = inject(CustomModalService);
  private userService = inject(UserService);

  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [CUSTOM_EMAIL_PATTERN, CUSTOM_REQUIRED]),
        currentpassword: new FormControl('', [CUSTOM_REQUIRED]),
      },
      {
        updateOn: 'change',
      }
    );
  }

  sendLoginSession(): void {
    this.submitForm = true;
    if (this.loginForm.invalid) return;
    this.spinnerGeneralService.showSpinner();
    this.commonLoginService
      .login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .pipe(
        takeUntilDestroyed(this.destroy),
        map<TOKEN_SESSION, string>(
          (sessionResponse) => sessionResponse.nombreRol
        )
      )
      .subscribe({
        next: (roleName) => {
          this.spinnerGeneralService.hideSpinner();
          this.userService.saveRole(roleName);
          this.router.navigateByUrl(ROUTES_PATH.MAIN_PAGE).then(() => {
            window.location.reload();
          });
        },
        error: (errorSessionResponse) => {
          this.spinnerGeneralService.hideSpinner();
          /* Depending on the error number, what is executed */
          const numberError = errorSessionResponse['error']['numeroError'];
          const reasonReport =
            errorSessionResponse['error']['cuentaEliminadaMotivos'];
          /* Method to select how what happens in the error is treated in a more orderly way */
          this.errorNumberSessionResponse(numberError, reasonReport);
        },
      });
  }

  errorNumberSessionResponse(
    numberError: number,
    reasonReport: string[]
  ): void {
    switch (numberError) {
      case 1: {
        /* Invalid username or password */
        this.submitError = true;
        break;
      }
      case 3: {
        /* Blocked account - reporting reasons are shown - */
        this.commonLoginService.saveReason(reasonReport);
        this.router.navigate([ROUTES_PATH.USER_BLOCKED_BY_ADMIN_PATH]);
        break;
      }
      default: {
        this.sweetAlertService.alertMessage(
          this.translateService.instant('common.error.general_error_title'),
          this.translateService.instant(
            'common.error.general_error_description'
          ),
          SWEET_ALERT_ICON.ERROR
        );
        break;
      }
    }
  }

  openRecoverPassModal(): void {
    this.customModalService.open(
      LoginRecoverPasswordComponent,
      CUSTOM_MODAL_CONFIG
    );
  }
}
