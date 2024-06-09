import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerGeneralComponent } from './spinner-general.component';



@NgModule({
  declarations: [SpinnerGeneralComponent],
  imports: [
    CommonModule
  ],
  exports: [SpinnerGeneralComponent]
})
export class SpinnerGeneralModule { }
