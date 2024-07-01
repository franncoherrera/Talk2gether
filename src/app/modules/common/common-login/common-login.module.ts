import { NgModule } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './components/login/login.module';
import { LoginDisabledModule } from './components/login-disabled/login-disabled.module';
import { LoginDisabledComponent } from './components/login-disabled/login-disabled.component';
import { authGuard } from '../../../shared/guards/auth.guard';

export const LOGIN_ROUTES: Routes = [
  {
    path: ROUTES_PATH.LOGIN_PATH,
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: ROUTES_PATH.USER_BLOCKED_BY_ADMIN_PATH,
    component: LoginDisabledComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [LoginModule, LoginDisabledModule],
  providers: [provideRouter(LOGIN_ROUTES)],
})
export class CommonLoginModule {}
