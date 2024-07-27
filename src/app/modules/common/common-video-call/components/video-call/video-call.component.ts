import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { MainPageService } from '../../../common-main-page/services/main-page.service';
import { Router } from '@angular/router';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { RateUserComponent } from '../rate-user/rate-user.component';
import { CUSTOM_MODAL_CONFIG } from '../../../../../shared/constants/customModalRefConfig';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';

@Component({
  selector: 'fhv-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.scss',
})
export class VideoCallComponent implements OnInit, OnDestroy {
  room$: Observable<ROOM_USER>;
  readonly ICON_CLASS = ICON_CLASS;
  isMuted: boolean = false;
  isSharedVideo: boolean = false;
  private readonly mainPageService: MainPageService = inject(MainPageService);
  private readonly router: Router = inject(Router);
  private customModalService: CustomModalService = inject(CustomModalService);

  ngOnInit() {
    this.room$ = this.mainPageService.getRoom();
  }

  muteMicro(): void {
    this.isMuted = !this.isMuted;
  }

  shareVideo(): void {
    this.isSharedVideo = !this.isSharedVideo;
  }

  finishCall(): void {
    this.customModalService.open(RateUserComponent, CUSTOM_MODAL_CONFIG);
    this.router.navigate([ROUTES_PATH.MAIN_PAGE]);
  }

  ngOnDestroy() {
    this.mainPageService.saveRoom(null);
  }
}
