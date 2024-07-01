import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { authGuard } from '../../../shared/guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { RegisterModule } from './components/register/register.module';
import { LanguageLevelModalModule } from './components/language-level-modal/language-level-modal.module';
import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';
import { TermsConditionModule } from './components/terms-condition/terms-condition.module';

export const REGISTER_ROUTES: Routes = [
  {
    path: ROUTES_PATH.REGISTER_PATH,
    component: RegisterComponent,
    canActivate: [authGuard],
  },
  {
    path: ROUTES_PATH.TERMS_CONDITION_PATH,
    component: TermsConditionComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RegisterModule,
    LanguageLevelModalModule,
    TermsConditionModule,
    RouterModule.forChild(REGISTER_ROUTES)
  ]
})
export class CommonRegisterModule { }
