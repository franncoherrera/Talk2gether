import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, map, of } from 'rxjs';
import { VALIDATOR_PATTERNS } from '../../../../../shared/constants/patterns';
import { TOKEN_SESSION } from '../../../../../shared/models/tokenSession';
import { CommonLoginService } from '../../services/common-login.service';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { TranslateService } from '@ngx-translate/core';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';

@Component({
  selector: 'fhv-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitForm: boolean = false;
  submitError: boolean = false;
  passwordType: string = 'password';
  sessionSubscription: Subscription;

  constructor(
    private router: Router,
    private commonLoginService: CommonLoginService,
    private spinnerGeneralService: SpinnerGeneralService,
    private sweetAlertService: SweetAlertService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [
          Validators.pattern(VALIDATOR_PATTERNS.patternEmail),
          Validators.required,
        ]),
        password: new FormControl('', [Validators.required]),
      },
      {
        updateOn: 'change',
      }
    );
  }

  updatePasswordType(event: string): void {
    this.passwordType = event;
  }

  sendLoginSession(): void {
    this.submitForm = true;
    if (this.loginForm.invalid) return;
    this.spinnerGeneralService.showSpinner();
    this.sessionSubscription = this.commonLoginService
      .login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .pipe(
        map<TOKEN_SESSION, string>(
          /* TODO Error de backend "nombreRol = nameRol" */
          (sessionResponse) => sessionResponse.nombreRol
        )
      )
      .subscribe({
        next: (roleName) => {
          this.spinnerGeneralService.hideSpinner();
          this.commonLoginService.saveRole(roleName);
          // document.location.href = routes_path.principal_path;
          // this.router.navigate VER SI SE PUEDE USAR ROUTER
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
        this.router.navigate([ROUTES_PATH.USER_BLOCKED_BY_ADMIN]);
        break;
      }
      default: {
        this.sweetAlertService.errorAlert(
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

  ngOnDestroy(): void {
    this.sessionSubscription?.unsubscribe();
  }
}
