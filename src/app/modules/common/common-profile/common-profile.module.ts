import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProfileViewModule } from './components/main-profile-view/main-profile-view.module';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { loggedGuard } from '../../../shared/guards/logged.guard';
import { MainProfileViewComponent } from './components/main-profile-view/main-profile-view.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: ROUTES_PATH.PROFILE_VIEW,
    component: MainProfileViewComponent,
    canActivate: [loggedGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainProfileViewModule,
    RouterModule.forChild(PROFILE_ROUTES),
  ],
})
export class CommonProfileModule {}
