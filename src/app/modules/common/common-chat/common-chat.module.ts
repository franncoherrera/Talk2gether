import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CometChatConversationsWithMessages } from '@cometchat/chat-uikit-angular';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { loggedGuard } from '../../../shared/guards/logged.guard';
import { CustomCometChatConversationsWithMessagesComponent } from './components/custom-comet-chat-conversations-with-messages/custom-comet-chat-conversations-with-messages.component';

export const CHAT_ROUTES: Routes = [
  {
    path: ROUTES_PATH.CHAT_MESSAGES,
    component: CustomCometChatConversationsWithMessagesComponent,
    canActivate: [loggedGuard],
  },
];

@NgModule({
  declarations: [CustomCometChatConversationsWithMessagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CHAT_ROUTES),
    CometChatConversationsWithMessages,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommonChatModule {}
