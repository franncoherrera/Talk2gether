import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './components/login/login.module';
import { LoginDisabledModule } from './components/login-disabled/login-disabled.module';
import { LoginDisabledComponent } from './components/login-disabled/login-disabled.component';

export const LOGIN_ROUTES: Routes = [
  {
    path: ROUTES_PATH.LOGIN_PATH,
    component: LoginComponent,
    //TODO guard
    // canActivate: [AuthGuard],
  },
  {
    path: ROUTES_PATH.USER_BLOCKED_BY_ADMIN,
    component: LoginDisabledComponent,
    //TODO guard
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [LoginModule, LoginDisabledModule],
  providers: [provideRouter(LOGIN_ROUTES)],
})
export class CommonLoginModule {}
