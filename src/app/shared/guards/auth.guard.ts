import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '../interceptors/sesion.service';
import { inject } from '@angular/core';
import { SweetAlertService } from '../../helpers/sweet-alert.service';
import { TranslateService } from '@ngx-translate/core';
import { SWEET_ALERT_ICON } from '../enums/sweeAlert.enum';
import { GENERAL_PATH } from '../constants/routes';

/**
 * AuthGuard function to protect routes based on user session status.
 *
 * This function is used to guard routes and redirect users based on their session status.
 *  If a user is already logged in (i.e., the session is not null),
 * they are shown an error message and redirected to the main path. If no session is present,
 * the user is allowed to proceed to the requested route.
 *
 * @function
 * @returns {boolean} - Returns `false` and redirects to the main path if a session
 * is present, otherwise returns `true` to allow access to the route.
 *
 */
export const authGuard: CanActivateFn = () => {
  const sesionService = inject(SesionService);
  const router = inject(Router);
  const sweetAlertService = inject(SweetAlertService);
  const translateService = inject(TranslateService);
  const currentSession: string = sesionService.getCurrentSesion();
  if (currentSession !== null) {
    sweetAlertService.alertMessageConfirm(
      translateService.instant('common.error.general_error_logged'),
      SWEET_ALERT_ICON.ERROR
    );
    router.navigate([GENERAL_PATH.MAIN_PATH]);
    return false;
  } else {
    return true;
  }
};
