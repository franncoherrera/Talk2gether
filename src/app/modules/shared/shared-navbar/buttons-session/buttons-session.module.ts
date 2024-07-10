import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsSessionComponent } from './buttons-session.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ButtonsSessionComponent],
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [ButtonsSessionComponent],
})
export class ButtonsSessionModule {}
