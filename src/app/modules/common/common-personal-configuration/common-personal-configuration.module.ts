import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalConfigurationModule } from './components/personal-configuration/personal-configuration.module';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { PersonalConfigurationComponent } from './components/personal-configuration/personal-configuration.component';
import { loggedGuard } from '../../../shared/guards/logged.guard';

export const CONFIG_PAGE_ROUTES: Routes = [
  {
    path: ROUTES_PATH.CONFIG_PAGE,
    component: PersonalConfigurationComponent,
    canActivate: [loggedGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PersonalConfigurationModule,
    RouterModule.forChild(CONFIG_PAGE_ROUTES),
  ],
})
export class CommonPersonalConfigurationModule {}
