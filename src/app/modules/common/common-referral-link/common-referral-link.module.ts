import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonReferralLinkComponent } from './common-referral-link.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from '../../shared/bootstrap-modal/bootstrap-modal.component';
import { InputFormComponent } from '../../shared/input-form/input-form.component';



@NgModule({
  declarations: [CommonReferralLinkComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ModalComponent,
    InputFormComponent
  ],
  exports: [CommonReferralLinkComponent]
})
export class CommonReferralLinkModule { }
