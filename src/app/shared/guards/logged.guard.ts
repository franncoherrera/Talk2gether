import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '../interceptors/sesion.service';
import { inject } from '@angular/core';
import { SweetAlertService } from '../../helpers/sweet-alert.service';
import { TranslateService } from '@ngx-translate/core';
import { GENERAL_PATH } from '../constants/routes';
import { SWEET_ALERT_ICON } from '../enums/sweeAlert.enum';

export const loggedGuard: CanActivateFn = () => {
  const sesionService = inject(SesionService);
  const router = inject(Router);
  const sweetAlertService = inject(SweetAlertService);
  const translateService = inject(TranslateService);
  if (!sesionService.isLoggedIn()) {
    router.navigate([GENERAL_PATH.MAIN_PATH]);
    sweetAlertService.alertMessageConfirm(
      translateService.instant('common.error.general_error_not_logged'),
      SWEET_ALERT_ICON.ERROR
    );
    return true;
  } else {
    return false;
  }
};
