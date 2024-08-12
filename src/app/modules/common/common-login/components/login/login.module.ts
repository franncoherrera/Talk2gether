import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EyeButtonComponent } from '../../../../shared/eye-button/eye-button.component';
import { SpinnerGeneralModule } from '../../../../shared/spinner/componentes/spinner-general/spinner-general.module';
import { FormErrorComponent } from '../../../../shared/form-error/form-error.component';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    EyeButtonComponent,
    SpinnerGeneralModule,
    FormErrorComponent,
    InputFormComponent
  ],
})
export class LoginModule {}
