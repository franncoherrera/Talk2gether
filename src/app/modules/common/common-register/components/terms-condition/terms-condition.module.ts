import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionComponent } from './terms-condition.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [TermsConditionComponent],
  imports: [
    CommonModule,
    TranslateModule
  ], 
  exports: [TermsConditionComponent]
})
export class TermsConditionModule { }
