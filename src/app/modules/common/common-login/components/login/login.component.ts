import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, map, of } from 'rxjs';
import { VALIDATOR_PATTERNS } from '../../../../../shared/constants/patterns';
import { TOKEN_SESSION } from '../../../../../shared/models/tokenSession';
import { CommonLoginService } from '../../services/common-login.service';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';

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
    private loginService: CommonLoginService,
    private spinnerGeneralService: SpinnerGeneralService // private alertService: AlertsService, // private verificarCuentaService: VerificarCuentaService
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
    this.sessionSubscription = this.loginService
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
          this.loginService.saveRole(roleName);
          // document.location.href = routes_path.principal_path;
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
    // switch (numberError) {
    //   case 1: {
    //     /* Usuario o contraseña no válida*/
    //     this.submitError = true;
    //     break;
    //   }
    //   case 2: {
    //     /* Cuenta no verificada */
    //     sessionStorage.clear();
    //     localStorage.setItem('correo', this.loginForm.get('email').value);
    //     this.sessionSubscription.add(
    //       /* No funciona porque no esta levantado el servidor de correo */
    //       this.verificarCuentaService
    //         .reenviarCorreo(localStorage.getItem('correo'))
    //         .pipe(
    //           tap(() => this.router.navigate([routes_path.verify_account])),
    //           catchError((error) => {
    //             this.alertService.errorAlert(
    //               common_error.general_error_title,
    //               error
    //             );
    //             return of(error);
    //           })
    //         )
    //         .subscribe()
    //     );
    //     break;
    //   }
    //   case 3: {
    //     /* Cuenta bloqueada -se muestran los motivos de reporte-*/
    //     this.loginService.saveReason(reasonReport);
    //     this.router.navigate([routes_path.user_bloqued_by_admin]);
    //     break;
    //   }
    //   default: {
    //     this.alertService.errorAlert(
    //       common_error.general_error_title,
    //       common_error.general_error_description
    //     );
    //     break;
    //   }
    // }
  }

  ngOnDestroy(): void {
    this.sessionSubscription?.unsubscribe();
  }
}
