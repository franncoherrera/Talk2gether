import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { GENERAL_PATH } from '../../../../../shared/constants/routes';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { CommonLoginService } from '../../services/common-login.service';

@Component({
  selector: 'fhv-login-disabled',
  templateUrl: './login-disabled.component.html',
  styleUrl: './login-disabled.component.scss',
})
export class LoginDisabledComponent implements OnInit{
  reasonReports$: Observable<string[]>;
  readonly ICON_CLASS = ICON_CLASS;

  private router = inject(Router);
  private commonLoginService = inject(CommonLoginService);
  private sweetAlertService = inject(SweetAlertService);
  private translateService = inject(TranslateService);

  ngOnInit(): void {
    this.reasonReports$ = this.commonLoginService.getReason().pipe(
      map((reasonReports) => reasonReports),
      catchError((error) => {
        this.sweetAlertService.alertMessage(
          this.translateService.instant('common.error.general_error_title'),
          error,
          SWEET_ALERT_ICON.ERROR
        );
        return of([]);
      })
    );
  }

  redirectMainPage(): void {
    this.router.navigate([GENERAL_PATH.MAIN_PATH]);
  }
}
