import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EyeButtonComponent } from '../../../../shared/eye-button/eye-button.component';
import { SpinnerGeneralModule } from '../../../../shared/spinner-general/spinner-general.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    EyeButtonComponent,
    SpinnerGeneralModule,
  ],
})
export class LoginModule {}
