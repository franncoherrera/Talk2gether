import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalConfigurationComponent } from './personal-configuration.component';

@NgModule({
  declarations: [PersonalConfigurationComponent],
  imports: [CommonModule],
  exports: [PersonalConfigurationComponent],
})
export class PersonalConfigurationModule {}
