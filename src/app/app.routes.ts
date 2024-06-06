import { Routes } from '@angular/router';
import { GENERAL_PATH } from './constants/ROUTES';

export const routes: Routes = [
  {
    path: GENERAL_PATH.MAIN_PATH,
    loadComponent: () =>
      import(
        './modules/common/common-home-page/common-home-page.component'
      ).then((homePage) => homePage.CommonHomePageComponent),
  },
];
