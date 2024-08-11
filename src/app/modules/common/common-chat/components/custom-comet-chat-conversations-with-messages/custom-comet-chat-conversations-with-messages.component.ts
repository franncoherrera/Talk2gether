import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import {
  catchError,
  combineLatest,
  from,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { BreakPointService } from '../../../../../shared/services/break-point.service';
import { UserCometChatService } from '../../../../../shared/services/user-comet-chat.service';
import { UserService } from '../../../../../shared/services/user.service';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { MainPageService } from '../../../common-main-page/services/main-page.service';

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
  private readonly userCometChatService: UserCometChatService =
    inject(UserCometChatService);
  private readonly destroy: DestroyRef = inject(DestroyRef);
  private readonly mainPageService: MainPageService = inject(MainPageService);
  private readonly spinnerGeneralService: SpinnerGeneralService = inject(
    SpinnerGeneralService
  );

  ngOnInit(): void {
    this.spinnerGeneralService.showSpinner();
    this.userChatSelected$ = combineLatest([
      this.mainPageService.getUserIdChat(),
      this.userService.getIdUser(),
      from(CometChatUIKit.getLoggedinUser()),
    ]).pipe(
      takeUntilDestroyed(this.destroy),
      switchMap(
        ([userIdChatSelected, currentUser, getLoggedinUserCometChat]) => {
          if (!getLoggedinUserCometChat) {
            return from(
              CometChatUIKit.login({ uid: currentUser.toString() })
            ).pipe(
              tap(() => {
                this.spinnerGeneralService.hideSpinner();
              }),
              catchError(() => {
                this.userCometChatService.showModalErrorUnavailableChatSession();
                return of(null);
              }),
              switchMap(() =>
                of([userIdChatSelected, currentUser, getLoggedinUserCometChat])
              )
            );
          }
          return of([
            userIdChatSelected,
            currentUser,
            getLoggedinUserCometChat,
          ]);
        }
      ),
      catchError(() =>
        this.userCometChatService.showModalErrorUnavailableChatSession()
      ),
      switchMap(([userIdChatSelected]) => {
        if (!userIdChatSelected) {
          this.spinnerGeneralService.hideSpinner();
          return of(null);
        }
        return from(CometChat.getUser(userIdChatSelected)).pipe(
          tap(() => this.spinnerGeneralService.hideSpinner()),
          catchError(() =>
            this.userCometChatService.showModalErrorUnavailableChatSession()
          )
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.mainPageService.saveUserIdChat(null);
  }
}
