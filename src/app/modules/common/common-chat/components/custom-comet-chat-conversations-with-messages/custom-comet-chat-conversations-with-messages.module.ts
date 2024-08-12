import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CometChatConversationsWithMessages } from '@cometchat/chat-uikit-angular';
import { CustomCometChatConversationsWithMessagesComponent } from './custom-comet-chat-conversations-with-messages.component';

@NgModule({
  declarations: [CustomCometChatConversationsWithMessagesComponent],
  imports: [CommonModule, CometChatConversationsWithMessages],
  exports: [CustomCometChatConversationsWithMessagesComponent],
})
export class CustomCometChatConversationsWithMessagesModule {}
