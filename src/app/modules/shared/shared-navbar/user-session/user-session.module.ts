import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSessionComponent } from './user-session.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserSessionComponent],
  imports: [CommonModule, TranslateModule],
  exports: [UserSessionComponent],
})
export class UserSessionModule {}
