import { Routes } from '@angular/router';
import { GENERAL_PATH } from './shared/constants/routes';

export const routes: Routes = [
  {
    path: GENERAL_PATH.MAIN_PATH,
    loadComponent: () =>
      import(
        './modules/common/common-home-page/common-home-page.component'
      ).then((homePage) => homePage.CommonHomePageComponent),
  },
  {
    path: GENERAL_PATH.MAIN_PATH,
    loadChildren: () =>
      import('./modules/common/common-login/common-login.module').then(
        (loginPage) => loginPage.CommonLoginModule),
  },
];
