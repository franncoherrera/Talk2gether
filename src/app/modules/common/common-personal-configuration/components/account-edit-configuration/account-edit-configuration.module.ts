import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountEditConfigurationComponent } from './account-edit-configuration.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AccountEditConfigurationComponent],
  imports: [CommonModule, TranslateModule],
  exports: [AccountEditConfigurationComponent],
})
export class AccountEditConfigurationModule {}
