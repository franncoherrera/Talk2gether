import { Routes } from '@angular/router';
import { GENERAL_PATH } from './shared/constants/routes';

export const routes: Routes = [
  {
    path: GENERAL_PATH.MAIN_PATH,
    pathMatch: 'full',
    loadComponent: () =>
      import(
        './modules/common/common-home-page/common-home-page.component'
      ).then((homePage) => homePage.CommonHomePageComponent),
  },
  {
    path: GENERAL_PATH.MAIN_PATH,
    loadChildren: () =>
      import('./modules/common/common-login/common-login.module').then(
        (loginPage) => loginPage.CommonLoginModule
      ),
  },
  {
    path: GENERAL_PATH.MAIN_PATH,
    loadChildren: () =>
      import('./modules/common/common-register/common-register.module').then(
        (registerPage) => registerPage.CommonRegisterModule
      ),
  },
  {
    path: GENERAL_PATH.MAIN_PATH,
    loadChildren: () =>
      import('./modules/common/common-main-page/common-main-page.module').then(
        (mainPage) => mainPage.CommonMainPageModule
      ),
  },
  {
    path: GENERAL_PATH.MAIN_PATH,
    loadChildren: () =>
      import('./modules/common/common-ranking/common-ranking.module').then(
        (rankingPage) => rankingPage.CommonRankingModule
      ),
  },
  {
    path: GENERAL_PATH.MAIN_PATH,
    loadChildren: () =>
      import(
        './modules/common/common-personal-configuration/common-personal-configuration.module'
      ).then((configPage) => configPage.CommonPersonalConfigurationModule),
  },
  {
    path: GENERAL_PATH.MAIN_PATH,
    loadChildren: () =>
      import(
        './modules/common/common-video-call/common-video-call.module'
      ).then((videoCallPage) => videoCallPage.CommonVideoCallModule),
  },
  {
    path: GENERAL_PATH.MAIN_PATH,
    loadChildren: () =>
      import(
        './modules/common/common-chat/common-chat.module'
      ).then((chatModule) => chatModule.CommonChatModule),
  },
];
