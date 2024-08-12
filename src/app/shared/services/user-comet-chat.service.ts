import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, from, interval, Observable, of, switchMap } from 'rxjs';
import { SweetAlertService } from '../../helpers/sweet-alert.service';
import { ROUTES_PATH } from '../constants/routes';
import { SWEET_ALERT_ICON } from '../enums/sweeAlert.enum';
import { SpinnerGeneralService } from '../../modules/shared/spinner/services/spinner-general.service';

@Injectable({
  providedIn: 'root',
})
export class UserCometChatService {
  private readonly sweetAlertService: SweetAlertService =
    inject(SweetAlertService);
  private readonly router: Router = inject(Router);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly spinnerGeneralService: SpinnerGeneralService = inject(
    SpinnerGeneralService
  );

  logInCometchat(userId: number): Promise<Object> | undefined {
    return CometChatUIKit.login({ uid: userId.toString() });
  }

  updateUserCometChat(
    userId: string,
    nameUserCometchat: string,
    urlPhotoAvatarCometChat: string
  ): Promise<Object | undefined> {
    return CometChat.getUser(userId)
      .then((user) => {
        let userCometChat = user;
        userCometChat.setName(nameUserCometchat);
        userCometChat.setAvatar(urlPhotoAvatarCometChat);
        return CometChatUIKit.updateUser(userCometChat);
      })
      .catch(() => {
        return EMPTY;
      });
  }

  createUserCometChat(): Promise<Object | undefined> {
    let userCometChat = new CometChat.User();
    userCometChat.setUid('a');
    userCometChat.setName('aaa');
    userCometChat.setAvatar('aaa');
    return CometChatUIKit.updateUser(userCometChat);
  }

  showModalErrorUnavailableChatSession(): typeof EMPTY {
    this.spinnerGeneralService.hideSpinner();
    this.sweetAlertService.alertImpromptu({
      title: this.translateService.instant(
        'common.error.general_error_chat_not_available'
      ),
      icon: SWEET_ALERT_ICON.ERROR,
    });
    this.router.navigate([ROUTES_PATH.MAIN_PAGE]);
    return EMPTY;
  }

  buildUnreadQuantityMessage(): Observable<number> {
    return from(CometChat.getUnreadMessageCount()).pipe(
      switchMap((unreadMessageCount) => {
        if (
          !unreadMessageCount ||
          !unreadMessageCount['users'] ||
          typeof unreadMessageCount['users'] !== 'object'
        ) {
          return of(0);
        }
        const counts = Object.values(
          unreadMessageCount['users'] as { [key: string]: number }
        );
        const totalUnread = counts.reduce(
          (acc, count) => acc + (count as number),
          0
        );

        return of(totalUnread);
      })
    );
  }

  getUnreadQuantityMessage(): Observable<number> {
    return interval(5000).pipe(
      switchMap(() => this.buildUnreadQuantityMessage())
    );
  }
}
