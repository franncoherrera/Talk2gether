import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take } from 'rxjs';
import { SweetAlertService } from '../../helpers/sweet-alert.service';
import { MainPageService } from '../../modules/common/common-main-page/services/main-page.service';
import { ROUTES_PATH } from '../constants/routes';
import { SWEET_ALERT_ICON } from '../enums/sweeAlert.enum';
import { TranslateService } from '@ngx-translate/core';

/**
 * Guard function to ensure that the room data is available before allowing access to the route.
 *
 * This function checks if room data is available using `MainPageService`. 
 * If no room data is found (i.e., the room is null), it displays a warning message using `SweetAlertService` 
 * and redirects the user to the main page. 
 * If room data is available, the guard allows access to the route.
 *
 * @function
 * @returns {boolean} - Always returns `true` to allow access to the route. The redirection and alert display occur if room data is null.
 *
 */
export const emptyPhotoVideoCallGuard: CanActivateFn = () => {
  const mainPageService: MainPageService = inject(MainPageService);
  const router: Router = inject(Router);
  const sweetAlertService: SweetAlertService = inject(SweetAlertService);
  const translateService = inject(TranslateService);
  mainPageService
    .getRoom()
    .pipe(take(1))
    .subscribe({
      next: (room) => {
        if (room === null) {
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
