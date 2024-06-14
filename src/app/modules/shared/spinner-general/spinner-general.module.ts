import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerGeneralComponent } from './spinner-general.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [SpinnerGeneralComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [SpinnerGeneralComponent]
})
export class SpinnerGeneralModule { }
