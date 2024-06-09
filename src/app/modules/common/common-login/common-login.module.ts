import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, provideRouter } from '@angular/router';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { LoginComponent } from './components/login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EyeButtonComponent } from '../../shared/eye-button/eye-button.component';
import { SpinnerGeneralModule } from '../../shared/spinner-general/spinner-general.module';

export const LOGIN_ROUTES: Routes = [
  {
    path: ROUTES_PATH.LOGIN_PATH,
    component: LoginComponent,
    // canActivate: [AuthGuard],
  },
  // {
  //   path: routes_path.user_bloqued_by_admin,
  //   component: LoginDisabledComponent,
  //   canActivate: [AuthGuard],
  // },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    EyeButtonComponent,
    SpinnerGeneralModule,
  ],
  providers: [provideRouter(LOGIN_ROUTES)],
})
export class CommonLoginModule {}
