import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError, combineLatest, EMPTY, map, tap } from 'rxjs';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { REPORT_USER } from '../../../../../shared/models/reportUser.model';
import { FormService } from '../../../../../shared/services/form.service';
import { UserService } from '../../../../../shared/services/user.service';
import {
  CUSTOM_MAX_CHAR,
  CUSTOM_REQUIRED,
} from '../../../../../shared/validators/formValidator';
import { ModalComponent } from '../../../../shared/bootstrap-modal/bootstrap-modal.component';
import { TextAreaFormComponent } from '../../../../shared/text-area-form/text-area-form.component';
import { ProfileService } from '../../services/profile.service';
import { SelectFormComponent } from '../../../../shared/select-form/select-form.component';
import { InputCheckboxComponent } from '../../../../shared/input-checkbox/input-checkbox.component';
import { SpinnerGeneralService } from '../../../../shared/spinner/services/spinner-general.service';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fhv-report-user-modal',
  standalone: true,
  imports: [
    ModalComponent,
    TranslateModule,
    TextAreaFormComponent,
    ReactiveFormsModule,
    SelectFormComponent,
    InputCheckboxComponent,
  ],
  templateUrl: './report-user-modal.component.html',
  styleUrl: './report-user-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ReportUserModalComponent implements OnInit {
  userReportDetails: REPORT_USER;
  userReportMotivesList: string[];
  reportUserForm: FormGroup;
  submitForm: boolean = false;
  INPUT_TYPE = INPUT_TYPE;

  private readonly profileService: ProfileService = inject(ProfileService);
  private readonly userService: UserService = inject(UserService);
  protected readonly formService: FormService = inject(FormService);
  private readonly spinnerGeneralService: SpinnerGeneralService = inject(
    SpinnerGeneralService
  );
  private readonly sweetAlertService: SweetAlertService =
    inject(SweetAlertService);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly customModalService: CustomModalService =
    inject(CustomModalService);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.reportUserForm = new FormGroup(
      {
        motives: new FormControl([], [CUSTOM_REQUIRED]),
        descriptionReport: new FormControl('', [
          CUSTOM_REQUIRED,
          CUSTOM_MAX_CHAR,
        ]),
      },
      {
        updateOn: 'change',
      }
    );
    combineLatest([
      this.profileService.getIdUserProfile(),
      this.profileService.getReportMotivesUser(),
      this.userService.getIdUser(),
    ])
      .pipe(
        map(([reportedUser, userReportMotivesList, reporterUser]) => {
          return { reportedUser, userReportMotivesList, reporterUser };
        })
      )
      .subscribe(({ reportedUser, userReportMotivesList, reporterUser }) => {
        if (!reportedUser) {
          reportedUser = parseInt(localStorage.getItem('profile'));
        }
        this.userReportMotivesList = userReportMotivesList['listaNombreMotivo'];
        this.userReportDetails = {
          idCuentaReportado: reportedUser,
          nombreMotivo: [],
          idCuentaInformanteMotivo: reporterUser,
        };
      });
  }

  reportUser(): void {
    this.submitForm = true;
    if (this.reportUserForm.invalid) return;
    this.sweetAlertService.alertImpromptu({
      title: this.translateService.instant(
        'common.profile_user_page.report_user_modal.report_user_success'
      ),
      icon: SWEET_ALERT_ICON.SUCCESS,
    });
    this.customModalService.dismissActiveModal();
    // this.spinnerGeneralService.showSpinner();
    // this.buildReportUser();
    // this.profileService
    //   .reportUser(this.userReportDetails)
    //   .pipe(
    //     takeUntilDestroyed(this.destroy),
    //     tap(() => {
    //       this.sweetAlertService.alertImpromptu({
    //         title: this.translateService.instant(
    //           'common.profile_user_page.report_user_modal.report_user_sussess'
    //         ),
    //         icon: SWEET_ALERT_ICON.SUCCESS,
    //       });
    //       this.spinnerGeneralService.hideSpinner();
    //       this.customModalService.dismissActiveModal();
    //     }),
    //     catchError((error) => {
    //       this.sweetAlertService.alertImpromptu({
    //         title: error.error.mensaje,
    //         icon: SWEET_ALERT_ICON.ERROR,
    //       });
    //       this.spinnerGeneralService.hideSpinner();
    //       return EMPTY;
    //     })
    //   )
    //   .subscribe();
  }

  buildReportUser(): void {
    this.userReportDetails.nombreMotivo =
      this.reportUserForm.get('motives').value;
    this.userReportDetails.descripcionReporteMotivo =
      this.reportUserForm.get('descriptionReport').value;
  }
}
