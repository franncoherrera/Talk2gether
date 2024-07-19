import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonButtonsComponent } from './common-buttons.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonReferralLinkModule } from '../../../common/common-referral-link/common-referral-link.module';

@NgModule({
  declarations: [CommonButtonsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    CommonReferralLinkModule,
  ],
  exports: [CommonButtonsComponent],
})
export class CommonButtonsModule {}
