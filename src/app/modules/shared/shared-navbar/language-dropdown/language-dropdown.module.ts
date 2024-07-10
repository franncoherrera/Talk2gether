import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageDropdownComponent } from './language-dropdown.component';



@NgModule({
  declarations: [LanguageDropdownComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [LanguageDropdownComponent]
})
export class LanguageDropdownModule { }
