import { Injectable } from '@angular/core';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';

@Injectable({
  providedIn: 'root',
})
export class UserCometChatService {
  logInCometchat(userId: number): void {
    CometChatUIKit.getLoggedinUser().then((user: CometChat.User) => {
      if (!user) {
        CometChatUIKit.login({ uid: userId.toString() })
          .then()
          .catch(location.reload);
      }
    });
  }
}
