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

  /**
   * Logs in a user to CometChat.
   *
   * This method logs in a user to CometChat using the provided user ID. The user ID is converted to a string
   * and used for the login process.
   *
   * @param userId - The ID of the user to log in. This will be converted to a string.
   * @returns A promise that resolves with the result of the login operation or `undefined` if an error occurs.
   */
  logInCometchat(userId: number): Promise<Object> | undefined {
    return CometChatUIKit.login({ uid: userId.toString() });
  }

  /**
   * Updates the details of an existing CometChat user.
   *
   * This method retrieves an existing user by their ID, updates their name and avatar, and then applies the updates
   * using the CometChatUIKit.
   *
   * @param userId - The ID of the user to update.
   * @param nameUserCometchat - The new name for the CometChat user.
   * @param urlPhotoAvatarCometChat - The new avatar URL for the CometChat user.
   * @returns A promise that resolves with the result of the update operation, or `undefined` if an error occurs.
   */
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

  /**
   * Creates a new CometChat user with default values.
   *
   * This method creates a new user with predefined UID, name, and avatar values. The user is then updated using
   * the CometChatUIKit.
   *
   * @returns A promise that resolves with the result of the user creation operation or `undefined` if an error occurs.
   */
  createUserCometChat(): Promise<Object | undefined> {
    //TODO
    let userCometChat = new CometChat.User();
    return CometChatUIKit.updateUser(userCometChat);
  }

  /**
   * Shows an error modal when the chat session is unavailable.
   *
   * This method hides the spinner, displays an error alert indicating that the chat is not available, and redirects
   * the user to the main page.
   *
   * @returns An observable of `EMPTY`, which can be used for chaining or further processing.
   */
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

  /**
   * Builds the total unread message count.
   *
   * This method retrieves the unread message count for users from CometChat, calculates the total number of unread
   * messages, and returns it as an observable.
   *
   * @returns An observable that emits the total number of unread messages.
   */
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

  /**
   * Periodically retrieves the total unread message count.
   *
   * This method creates an observable that emits the total number of unread messages at regular intervals (every 5 seconds).
   *
   * @returns An observable that emits the total number of unread messages every 5 seconds.
   */
  getUnreadQuantityMessage(): Observable<number> {
    return interval(5000).pipe(
      switchMap(() => this.buildUnreadQuantityMessage())
    );
  }
}
