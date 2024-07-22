import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { FormErrorComponent } from '../../../../shared/form-error/form-error.component';
import { InputCheckboxComponent } from '../../../../shared/input-checkbox/input-checkbox.component';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { InterestModalComponent } from '../../../../shared/interest-modal/interest-modal.component';
import { SelectFormComponent } from '../../../../shared/select-form/select-form.component';
import { SpinnerGeneralModule } from '../../../../shared/spinner-general/spinner-general.module';
import { TextAreaFormComponent } from '../../../../shared/text-area-form/text-area-form.component';
import { RegisterComponent } from './register.component';
import { InterestLabelComponent } from '../../../../shared/interest-label/interest-label.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFormComponent,
    TranslateModule,
    SelectFormComponent,
    NgSelectModule,
    TextAreaFormComponent,
    InterestModalComponent,
    FormErrorComponent,
    InputCheckboxComponent,
    SpinnerGeneralModule,
    InterestLabelComponent
  ],
  providers: [
    TitleCasePipe
  ]
})
export class RegisterModule {}
