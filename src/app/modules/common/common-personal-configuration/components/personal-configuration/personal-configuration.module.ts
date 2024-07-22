import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EditConfigurationComponent } from '../edit-configuration/edit-configuration.component';
import { ShowConfigurationComponent } from '../show-configuration/show-configuration.component';
import { PersonalConfigurationComponent } from './personal-configuration.component';

@NgModule({
  declarations: [PersonalConfigurationComponent],
  imports: [
    CommonModule,
    EditConfigurationComponent,
    ShowConfigurationComponent,
    TranslateModule,
  ],
  exports: [PersonalConfigurationComponent],
})
export class PersonalConfigurationModule {}
