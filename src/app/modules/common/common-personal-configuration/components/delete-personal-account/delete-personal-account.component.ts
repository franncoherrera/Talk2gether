import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { GENERAL_PATH } from '../../../../../shared/constants/routes';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { SesionService } from '../../../../../shared/interceptors/sesion.service';
import { DELETE_ACOUNT_USER } from '../../../../../shared/models/deleteAccountUser.model';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { FormService } from '../../../../../shared/services/form.service';
import { UserService } from '../../../../../shared/services/user.service';
import { CUSTOM_REQUIRED } from '../../../../../shared/validators/formValidator';
import { ModalComponent } from '../../../../shared/bootstrap-modal/bootstrap-modal.component';
import { InputCheckboxComponent } from '../../../../shared/input-checkbox/input-checkbox.component';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { TextAreaFormComponent } from '../../../../shared/text-area-form/text-area-form.component';
import { PersonalConfigurationService } from '../../services/personal-configuration.service';

@Component({
  selector: 'fhv-delete-personal-account',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    TranslateModule,
    InputFormComponent,
    ReactiveFormsModule,
    InputCheckboxComponent,
    TextAreaFormComponent,
    InputFormComponent,
  ],
  templateUrl: './delete-personal-account.component.html',
  styleUrl: './delete-personal-account.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DeletePersonalAccountComponent implements OnInit {
  accountMotives$: Observable<string[]>;
  accountMotivesForm: FormGroup;
  submitForm: boolean;
  showTextBox: boolean = false;
  readonly INPUT_TYPE = INPUT_TYPE;

  protected readonly formService: FormService = inject(FormService);
  private readonly personalConfigurationService: PersonalConfigurationService =
    inject(PersonalConfigurationService);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly userService: UserService = inject(UserService);
  private readonly destroy: DestroyRef = inject(DestroyRef);
  private readonly sweetAlertService: SweetAlertService =
    inject(SweetAlertService);
  private readonly sessionService: SesionService = inject(SesionService);
  private readonly router: Router = inject(Router);
  private readonly custoModalService: CustomModalService =
    inject(CustomModalService);

  ngOnInit(): void {
    this.accountMotives$ = this.personalConfigurationService
      .getDeleteAccountMotives()
      .pipe(map((motives) => motives['listaNombreMotivo']));

    this.accountMotivesForm = new FormGroup(
      {
        motives: new FormControl('', [CUSTOM_REQUIRED]),
        userMotive: new FormControl(''),
        password: new FormControl('', [CUSTOM_REQUIRED]),
      },
      {
        updateOn: 'change',
      }
    );
  }

  deleteAccount(): void {
    this.submitForm = true;
    if (this.accountMotivesForm.invalid) return;
    this.userService
      .getIdUser()
      .pipe(
        takeUntilDestroyed(this.destroy),
        switchMap((userId) =>
          this.personalConfigurationService
            .deleteUserAccount(this.buildDeleteUserAccount(userId))
            .pipe(
              catchError((error) => {
                this.sweetAlertService.alertImpromptu({
                  title: error.error,
                  icon: SWEET_ALERT_ICON.ERROR,
                });
                return EMPTY;
              }),
              tap(() => {
                this.sessionService.clearLocalSession();
                this.custoModalService.dismissActiveModal();
                this.router.navigate([GENERAL_PATH.MAIN_PATH]);
                this.sweetAlertService.alertMessageConfirm(
                  this.translateService.instant(
                    'common.delete_personal_account_modal.delete_personal_account_succes_message'
                  ),
                  SWEET_ALERT_ICON.SUCCESS
                );
              })
            )
        )
      )
      .subscribe();
  }

  getCompleteMotives(accountMotives: string[]): string[] {
    return [
      ...accountMotives,
      this.translateService.instant(
        'common.delete_personal_account_modal.delete_personal_account_other_motive'
      ),
    ];
  }

  checkboxSelected(): boolean {
    return this.accountMotivesForm
      .get('motives')
      .value.includes(
        this.translateService.instant(
          'common.delete_personal_account_modal.delete_personal_account_other_motive'
        )
      );
  }

  buildDeleteUserAccount(userId: number): DELETE_ACOUNT_USER {
    return {
      idCuenta: userId,
      listaMotivos: this.accountMotivesForm.get('motives').value,
      descripcionCuentaEliminada:
        this.accountMotivesForm.get('userMotive').value,
      contrasenia: this.accountMotivesForm.get('password').value,
    };
  }
}
