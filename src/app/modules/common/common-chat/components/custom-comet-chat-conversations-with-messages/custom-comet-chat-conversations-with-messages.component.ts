import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import {
  catchError,
  combineLatest,
  EMPTY,
  from,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { BreakPointService } from '../../../../../shared/services/break-point.service';
import { UserService } from '../../../../../shared/services/user.service';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { MainPageService } from '../../../common-main-page/services/main-page.service';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fhv-custom-comet-chat-conversations-with-messages',
  templateUrl: './custom-comet-chat-conversations-with-messages.component.html',
  styleUrl: './custom-comet-chat-conversations-with-messages.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CustomCometChatConversationsWithMessagesComponent
  implements OnInit, OnDestroy
{
  userIdChatSelected: string = null;
  userChatSelected$: Observable<CometChat.User>;

  protected readonly breakPointService: BreakPointService =
    inject(BreakPointService);
  private readonly userService: UserService = inject(UserService);
  private readonly destroy: DestroyRef = inject(DestroyRef);
  private readonly mainPageService: MainPageService = inject(MainPageService);
  private readonly spinnerGeneralService: SpinnerGeneralService = inject(
    SpinnerGeneralService
  );
  private readonly sweetAlertService: SweetAlertService =
    inject(SweetAlertService);
  private readonly router: Router = inject(Router);
  private readonly translateService: TranslateService =
    inject(TranslateService);

  ngOnInit(): void {
    this.spinnerGeneralService.showSpinner();
    this.userChatSelected$ = combineLatest([
      this.mainPageService.getUserIdChat(),
      this.userService.getIdUser(),
    ]).pipe(
      takeUntilDestroyed(this.destroy),
      tap(([_, currentUser]) => {
        CometChatUIKit.getLoggedinUser()
          .then((user: CometChat.User) => {
            if (!user) {
              this.userService.logInCometchat(currentUser);
            }
          })
          .catch(() => this.showModalErrorUnavailableChatSession());
      }),
      catchError(() => this.showModalErrorUnavailableChatSession()),
      switchMap(([userIdChatSelected]) => {
        if (!userIdChatSelected) {
          this.spinnerGeneralService.hideSpinner();
          return of(null);
        }
        return from(CometChat.getUser(userIdChatSelected)).pipe(
          tap(() => this.spinnerGeneralService.hideSpinner()),
          catchError(() => this.showModalErrorUnavailableChatSession())
        );
      })
    );
  }

  showModalErrorUnavailableChatSession(): typeof EMPTY {
    this.spinnerGeneralService.hideSpinner();
    this.sweetAlertService.alertImpromptu({
      title: this.translateService.instant('common.error.general_error_chat_not_available'),
      icon: SWEET_ALERT_ICON.ERROR,
    });
    this.router.navigate([ROUTES_PATH.MAIN_PAGE]);
    return EMPTY;
  }

  ngOnDestroy(): void {
    this.mainPageService.saveUserIdChat(null);
  }
}
