import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take } from 'rxjs';
import { SweetAlertService } from '../../helpers/sweet-alert.service';
import { MainPageService } from '../../modules/common/common-main-page/services/main-page.service';
import { ROUTES_PATH } from '../constants/routes';
import { SWEET_ALERT_ICON } from '../enums/sweeAlert.enum';
import { TranslateService } from '@ngx-translate/core';

export const emptyPhotoVideoCallGuard: CanActivateFn = () => {
  const mainPageService: MainPageService = inject(MainPageService);
  const router: Router = inject(Router);
  const sweetAlertService: SweetAlertService = inject(SweetAlertService);
  const translateService = inject(TranslateService);
  mainPageService
    .getUrlPhoto()
    .pipe(take(1))
    .subscribe({
      next: (urlPhoto) => {
        if (urlPhoto === null) {
          sweetAlertService.alertImpromptu({
            title: translateService.instant(
              'common.error.general_error_null_video_call'
            ),
            icon: SWEET_ALERT_ICON.WARNING,
          });
          router.navigate([ROUTES_PATH.MAIN_PAGE]);
        }
      },
    });
  return true;
};
