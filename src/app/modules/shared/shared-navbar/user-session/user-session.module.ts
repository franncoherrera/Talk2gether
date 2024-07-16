import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSessionComponent } from './user-session.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserSessionComponent],
  imports: [CommonModule, TranslateModule,RouterModule],
  exports: [UserSessionComponent],
})
export class UserSessionModule {}
