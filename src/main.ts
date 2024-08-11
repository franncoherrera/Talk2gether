/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { UIKitSettingsBuilder } from '@cometchat/uikit-shared';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { COMETCHAT_CONSTANTS } from './app/shared/constants/cometchatConstants';
import { LANGUAGE } from './app/shared/enums/languages.enum';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

CometChatUIKit.init(UIKitSettings)
  .then(() => {
    CometChatUIKit.Localize.setLocale(
      localStorage.getItem('selectedLang') || LANGUAGE.SPANISH
    );
  })
  .catch();
