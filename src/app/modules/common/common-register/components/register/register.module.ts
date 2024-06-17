import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFormComponent,
    TranslateModule
  ]
})
export class RegisterModule { }
