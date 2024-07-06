import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRecoverPasswordComponent } from './login-recover-password.component';
import { ModalComponent } from '../../../../shared/bootstrap-modal/bootstrap-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginRecoverPasswordComponent],
  imports: [
    CommonModule,
    ModalComponent,
    TranslateModule,
    InputFormComponent,
    ReactiveFormsModule
  ],
  exports: [LoginRecoverPasswordComponent]
})
export class LoginRecoverPasswordModule { }
