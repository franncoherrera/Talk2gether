import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageDropdownModule } from '../language-dropdown/language-dropdown.module';
import { SharedNavbarComponent } from './shared-navbar.component';
import { ButtonsSessionModule } from '../buttons-session/buttons-session.module';
import { UserSessionModule } from '../user-session/user-session.module';

@NgModule({
  declarations: [SharedNavbarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    LanguageDropdownModule,
    ButtonsSessionModule,
    UserSessionModule,
  ],
  exports: [SharedNavbarComponent],
})
export class SharedNavbarModule {}
