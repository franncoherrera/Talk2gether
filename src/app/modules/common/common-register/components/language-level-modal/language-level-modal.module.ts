import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from '../../../../shared/bootstrap-modal/bootstrap-modal.component';
import { LanguageLevelModalComponent } from './language-level-modal.component';

@NgModule({
  declarations: [LanguageLevelModalComponent],
  imports: [CommonModule, ModalComponent, TranslateModule],
  exports: [LanguageLevelModalComponent]
})
export class LanguageLevelModalModule {}
