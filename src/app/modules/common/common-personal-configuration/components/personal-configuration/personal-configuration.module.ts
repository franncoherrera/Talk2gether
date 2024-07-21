import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalConfigurationComponent } from './personal-configuration.component';
import { EditConfigurationComponent } from '../edit-configuration/edit-configuration.component';
import { ShowConfigurationComponent } from '../show-configuration/show-configuration.component';
import { TranslateModule } from '@ngx-translate/core';

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
