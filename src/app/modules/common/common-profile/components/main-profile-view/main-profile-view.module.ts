import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProfileViewComponent } from './main-profile-view.component';
import { SpinnerGeneralModule } from '../../../../shared/spinner/componentes/spinner-general/spinner-general.module';
import { InterestLabelComponent } from '../../../../shared/interest-label/interest-label.component';
import { BubbleButtonComponent } from '../../../../shared/bubble-button/bubble-button.component';

@NgModule({
  declarations: [MainProfileViewComponent],
  imports: [
    CommonModule,
    SpinnerGeneralModule,
    InterestLabelComponent,
    BubbleButtonComponent,
  ],
  exports: [MainProfileViewComponent],
})
export class MainProfileViewModule {}
