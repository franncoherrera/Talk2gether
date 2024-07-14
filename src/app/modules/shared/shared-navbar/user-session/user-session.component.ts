import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { ICON_CLASS } from '../../../../../../public/assets/icons_class/icon_class';
import { SweetAlertService } from '../../../../helpers/sweet-alert.service';
import { ROUTES_PATH } from '../../../../shared/constants/routes';
import { SWEET_ALERT_ICON } from '../../../../shared/enums/sweeAlert.enum';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { CurrentUser } from '../../../../shared/models/currentUser.model';
import { BreakPointService } from '../../../../shared/services/break-point.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'fhv-user-session',
  templateUrl: './user-session.component.html',
  styleUrl: './user-session.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserSessionComponent implements OnInit {
  currentUser$: Observable<CurrentUser>;
  @Output() closeNavbar: EventEmitter<void> = new EventEmitter();
  readonly ICON_CLASS = ICON_CLASS;
  readonly ROUTES_PATH = ROUTES_PATH;

  constructor(
    protected sesionService: SesionService,
    private userService: UserService,
    protected breakPointService: BreakPointService,
    private sweetAlertService: SweetAlertService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.sesionService.isLoggedIn()) {
      // TODO translataion doesn't work here
      this.currentUser$ = this.userService.getCurrentUser().pipe(
        tap((currentUser) => this.userService.saveId(currentUser.id)),
        catchError(() => {
          this.sweetAlertService.alertMessage(
            this.translateService.instant('Session Error'),
            this.translateService.instant('Session Expired'),
            SWEET_ALERT_ICON.ERROR
          );
          this.sesionService.clearLocalSession();
          this.router.navigate([ROUTES_PATH.LOGIN_PATH]);
          return of();
        })
      );
    }
  }

  closeNavbarChild(): void {
    this.closeNavbar.emit();
  }
  
}
