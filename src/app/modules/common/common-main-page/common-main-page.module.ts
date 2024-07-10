import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageModule } from './components/main-page/main-page.module';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { MainPageComponent } from './components/main-page/main-page.component';

export const MAIN_PAGE_ROUTES: Routes = [
  {
    path: ROUTES_PATH.MAIN_PAGE,
    component: MainPageComponent,
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
