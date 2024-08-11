import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { BreakPointService } from '../../../../../shared/services/break-point.service';
import { UserService } from '../../../../../shared/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fhv-custom-comet-chat-conversations-with-messages',
  templateUrl: './custom-comet-chat-conversations-with-messages.component.html',
  styleUrl: './custom-comet-chat-conversations-with-messages.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CustomCometChatConversationsWithMessagesComponent
  implements OnInit
{
  protected readonly breakPointService: BreakPointService =
    inject(BreakPointService);
  private readonly userService: UserService = inject(UserService);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.userService
      .getIdUser()
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (userId) => {
          CometChatUIKit.getLoggedinUser().then((user: CometChat.User) => {
            if (!user) {
              this.userService.logInCometchat(userId);
            }
          });
        },
      });
  }
}
