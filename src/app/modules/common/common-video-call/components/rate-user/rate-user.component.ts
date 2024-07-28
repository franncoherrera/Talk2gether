import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { ModalComponent } from '../../../../shared/bootstrap-modal/bootstrap-modal.component';
import { VideoCallService } from '../../services/video-call.service';
import { UserService } from '../../../../../shared/services/user.service';
import { catchError, EMPTY, Observable, of, switchMap } from 'rxjs';
import { QUALIFY_USER } from '../../../../../shared/models/qualifyUser.model';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { RateService } from '../../services/rate.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_REQUIRED } from '../../../../../shared/validators/formValidator';
import { FormErrorComponent } from '../../../../shared/form-error/form-error.component';
import { FormService } from '../../../../../shared/services/form.service';

@Component({
  selector: 'fhv-rate-user',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    TranslateModule,
    ReactiveFormsModule,
    FormErrorComponent,
  ],
  templateUrl: './rate-user.component.html',
  styleUrl: './rate-user.component.scss',
})
export class RateUserComponent implements OnInit {
  @Input() idVideoCall: string;
  readonly ICON_CLASS = ICON_CLASS;
  readonly INPUT_TYPE = INPUT_TYPE;
  selectedRating: number = 0;
  qualifyUser$: Observable<QUALIFY_USER>;
  submitForm: boolean = false;
  rateForm: FormGroup;
  private readonly videoCallService: VideoCallService =
    inject(VideoCallService);
  private readonly userService: UserService = inject(UserService);
  protected readonly customModalService: CustomModalService =
    inject(CustomModalService);
  private readonly sweetAlertService: SweetAlertService =
    inject(SweetAlertService);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly spinnerGeneralService: SpinnerGeneralService = inject(
    SpinnerGeneralService
  );
  private readonly rateService: RateService = inject(RateService);
  private readonly destroy: DestroyRef = inject(DestroyRef);
  protected readonly formService: FormService = inject(FormService);

  ngOnInit() {
    this.rateForm = new FormGroup(
      {
        star: new FormControl('', [CUSTOM_REQUIRED]),
      },
      {
        updateOn: 'change',
      }
    );
    this.qualifyUser$ = this.userService.getIdUser().pipe(
      switchMap<number, Observable<QUALIFY_USER>>((userId) =>
        this.videoCallService.getParticipant(userId, this.idVideoCall)
      ),
      catchError(() => {
        this.customModalService.dismissActiveModal();
        this.sweetAlertService.alertImpromptu({
          title: this.translateService.instant(
            'common.error.general_error_no_call'
          ),
          icon: SWEET_ALERT_ICON.ERROR,
        });
        return EMPTY;
      })
    );
  }

  onRatingSelected(value: number): void {
    this.selectedRating = value;
    this.rateForm.get('star').setValue(value);
  }

  rateUser(qualifyUser: QUALIFY_USER): void {
    this.submitForm = true;
    if (this.rateForm.invalid) return;
    this.customModalService.dismissActiveModal();
    this.sweetAlertService.alertImpromptu({
      title: this.translateService.instant(
        'common.rate_user_page.rate_user_page_qualify_user'
      ),
      icon: SWEET_ALERT_ICON.SUCCESS,
    });
    // this.rateService
    //   .rateUser(
    //     qualifyUser.idCalificador,
    //     qualifyUser.idCalificado,
    //     qualifyUser.idReunionVirtual,
    //     this.selectedRating
    //   )
    //   .pipe(
    //     takeUntilDestroyed(this.destroy),
    //     catchError(() => {
    //       this.spinnerGeneralService.hideSpinner();
    //       this.customModalService.dismissActiveModal();
    //       this.sweetAlertService.alertImpromptu({
    //         title: this.translateService.instant(
    //           'common.error.general_error_user_not_qualify'
    //         ),
    //         icon: SWEET_ALERT_ICON.ERROR,
    //       });
    //       return EMPTY;
    //     })
    //   )
    //   .subscribe({
    //     next: () => {
    //       this.spinnerGeneralService.hideSpinner();
    //       this.customModalService.dismissActiveModal();
    //       this.sweetAlertService.alertImpromptu({
    //         title: this.translateService.instant(
    //           'common.rate_user_page.rate_user_page_qualify_user'
    //         ),
    //         icon: SWEET_ALERT_ICON.SUCCESS,
    //       });
    //     },
    //   });
  }
}
