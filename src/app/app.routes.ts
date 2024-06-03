import { Routes } from '@angular/router';
import { GENERAL_PATH } from './constants/ROUTES';

export const routes: Routes = [
  {
    path: GENERAL_PATH.MAIN_PATH,
    loadComponent: () =>
      import('./modules/common/home-page/home-page.component').then(
        (homePage) => homePage.HomePageComponent
      ),
  },
];
