import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { loggedGuard } from '../../../shared/guards/logged.guard';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MainPageModule } from './components/main-page/main-page.module';

export const MAIN_PAGE_ROUTES: Routes = [
  {
    path: ROUTES_PATH.MAIN_PAGE,
    component: MainPageComponent,
    canActivate: [loggedGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainPageModule,
    RouterModule.forChild(MAIN_PAGE_ROUTES),
  ],
})
export class CommonMainPageModule {}
