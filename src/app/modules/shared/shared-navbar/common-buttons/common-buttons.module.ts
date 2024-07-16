import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonButtonsComponent } from './common-buttons.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CommonButtonsComponent],
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [CommonButtonsComponent],
})
export class CommonButtonsModule {}
