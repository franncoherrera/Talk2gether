import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './progress-bar.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ProgressBarComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [ProgressBarComponent]
})
export class ProgressBarModule { }
