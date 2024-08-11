import {
  Component,
  inject,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { TranslateService } from '@ngx-translate/core';
import {
  catchError,
  combineLatest,
  EMPTY,
  from,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { ICON_CLASS } from '../../../../../../public/assets/icons_class/icon_class';
import { SweetAlertService } from '../../../../helpers/sweet-alert.service';
import { ROUTES_PATH } from '../../../../shared/constants/routes';
import { SWEET_ALERT_ICON } from '../../../../shared/enums/sweeAlert.enum';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { CURRENT_USER } from '../../../../shared/models/currentUser.model';
import { BreakPointService } from '../../../../shared/services/break-point.service';
import { UserCometChatService } from '../../../../shared/services/user-comet-chat.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'fhv-user-session',
  templateUrl: './user-session.component.html',
  styleUrl: './user-session.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserSessionComponent implements OnInit {
  currentUser$: Observable<CURRENT_USER>;
  isLogedIn$: Observable<boolean>;
  combined$: Observable<{ user: CURRENT_USER; isLoggedIn: boolean }>;
  closeNavbar = output<void>();
  readonly ICON_CLASS = ICON_CLASS;
  readonly ROUTES_PATH = ROUTES_PATH;

  protected readonly sesionService: SesionService = inject(SesionService);
  private readonly userService: UserService = inject(UserService);
  private readonly userCometChatService: UserCometChatService =
    inject(UserCometChatService);
  protected readonly breakPointService: BreakPointService =
    inject(BreakPointService);
  private readonly sweetAlertService: SweetAlertService =
    inject(SweetAlertService);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    if (this.sesionService.isLoggedIn()) {
      this.isLogedIn$ = this.sesionService.getLoggedIn();
      // TODO translataion doesn't work here
      this.currentUser$ = this.userService.getCurrentUser().pipe(
        switchMap((currentUser) => {
          return from(
            CometChatUIKit.login({ uid: currentUser.toString() })
          ).pipe(
            tap(() => {
              this.userService.saveId(currentUser.id);
            }),
            map(() => currentUser),
            catchError(() => {
              this.sweetAlertService.alertMessage(
                this.translateService.instant('Session Error'),
                this.translateService.instant('Session Expired'),
                SWEET_ALERT_ICON.ERROR
              );
              this.sesionService.clearLocalSession();
              this.router.navigate([ROUTES_PATH.LOGIN_PATH]);
              return EMPTY;
            })
          );
        })
      );
      this.combined$ = combineLatest({
        user: this.currentUser$,
        isLoggedIn: this.isLogedIn$,
      });
    }
  }

  closeNavbarChild(): void {
    this.closeNavbar.emit();
  }
}
