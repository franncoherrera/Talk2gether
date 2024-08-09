import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EditConfigurationComponent } from '../edit-configuration/edit-configuration.component';
import { ShowConfigurationComponent } from '../show-configuration/show-configuration.component';
import { PersonalConfigurationComponent } from './personal-configuration.component';
import { AccountEditConfigurationModule } from '../account-edit-configuration/account-edit-configuration.module';

@NgModule({
  declarations: [PersonalConfigurationComponent],
  imports: [
    CommonModule,
    EditConfigurationComponent,
    ShowConfigurationComponent,
    TranslateModule,
    AccountEditConfigurationModule
  ],
  exports: [PersonalConfigurationComponent],
})
export class PersonalConfigurationModule {}
