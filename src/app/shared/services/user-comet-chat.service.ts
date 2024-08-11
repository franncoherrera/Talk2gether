import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY } from 'rxjs';
import { SweetAlertService } from '../../helpers/sweet-alert.service';
import { SpinnerGeneralService } from '../../modules/shared/spinner-general/spinner-general.service';
import { ROUTES_PATH } from '../constants/routes';
import { SWEET_ALERT_ICON } from '../enums/sweeAlert.enum';

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

  updateUserCometChat(): Promise<Object | undefined> {
    let userCometChat = new CometChat.User();
    userCometChat.setName('aaa');
    userCometChat.setAvatar('aaa');
    // PASAR A OBS
    return CometChatUIKit.updateUser(userCometChat);
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
}
