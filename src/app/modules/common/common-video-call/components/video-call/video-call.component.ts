import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { catchError, of, take } from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { CUSTOM_MODAL_CONFIG } from '../../../../../shared/constants/customModalRefConfig';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { MainPageService } from '../../../common-main-page/services/main-page.service';
import { RateUserComponent } from '../rate-user/rate-user.component';

@Component({
  selector: 'fhv-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.scss',
})
export class VideoCallComponent implements OnInit, OnDestroy {
  room: ROOM_USER;
  idVideoCall: string = null;
  readonly ICON_CLASS = ICON_CLASS;
  isMuted: boolean = false;
  isSharedVideo: boolean = false;
  private readonly mainPageService: MainPageService = inject(MainPageService);
  private readonly router: Router = inject(Router);
  private readonly customModalService: CustomModalService =
    inject(CustomModalService);
  private readonly sweetAlertService: SweetAlertService =
    inject(SweetAlertService);
  private readonly translateService = inject(TranslateService);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    this.mainPageService
      .getRoom()
      .pipe(
        takeUntilDestroyed(this.destroy),
        take(1),
        catchError(() => {
          this.sweetAlertService.alertImpromptu({
            title: this.translateService.instant(
              'common.error.general_error_null_video_call'
            ),
            icon: SWEET_ALERT_ICON.WARNING,
          });
          this.router.navigate([ROUTES_PATH.MAIN_PAGE]);
          return of(null);
        })
      )
      .subscribe({
        next: (room) => {
          this.room = room;
          this.idVideoCall = room.linkReunionVirtual;
        },
      });
  }

  muteMicro(): void {
    this.isMuted = !this.isMuted;
  }

  shareVideo(): void {
    this.isSharedVideo = !this.isSharedVideo;
  }

  finishCall(): void {
    this.router.navigate([ROUTES_PATH.MAIN_PAGE]);
  }

  openRateModal(): void {
    if (this.idVideoCall !== null) {
      const modalRef: NgbModalRef = this.customModalService.open(
        RateUserComponent,
        CUSTOM_MODAL_CONFIG
      );
      modalRef.componentInstance.idVideoCall = this.idVideoCall;
    }
  }

  ngOnDestroy() {
    this.openRateModal();
    this.mainPageService.saveRoom(null);
  }
}
