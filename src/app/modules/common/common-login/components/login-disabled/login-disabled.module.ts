import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDisabledComponent } from './login-disabled.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginDisabledComponent],
  imports: [CommonModule, TranslateModule],
  exports: [LoginDisabledComponent],
})
export class LoginDisabledModule {}
