import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { authGuard } from '../../../shared/guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { RegisterModule } from './components/register/register.module';

export const REGISTER_ROUTES: Routes = [
  {
    path: ROUTES_PATH.REGISTER_PATH,
    component: RegisterComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RegisterModule,
    RouterModule.forChild(REGISTER_ROUTES)
  ]
})
export class CommonRegisterModule { }
