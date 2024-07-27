import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { MainPageService } from '../../../common-main-page/services/main-page.service';
import { Router } from '@angular/router';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';

@Component({
  selector: 'fhv-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.scss',
})
export class VideoCallComponent implements OnInit, OnDestroy {
  urlPhoto$: Observable<string>;
  readonly ICON_CLASS = ICON_CLASS;
  isMuted: boolean = false;
  isSharedVideo: boolean = false;
  private mainPageService: MainPageService = inject(MainPageService);
  private readonly router: Router = inject(Router);

  ngOnInit() {
    this.urlPhoto$ = this.mainPageService.getUrlPhoto();
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

  ngOnDestroy() {
    this.mainPageService.saveUrlPhoto(null);
  }
}
