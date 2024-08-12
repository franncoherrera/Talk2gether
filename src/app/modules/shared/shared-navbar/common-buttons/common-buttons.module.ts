import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonButtonsComponent } from './common-buttons.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonReferralLinkModule } from '../../../common/common-referral-link/common-referral-link.module';
import { ChatButtonComponent } from './chat-button/chat-button.component';

@NgModule({
  declarations: [CommonButtonsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    CommonReferralLinkModule,
    ChatButtonComponent
  ],
  exports: [CommonButtonsComponent],
})
export class CommonButtonsModule {}
