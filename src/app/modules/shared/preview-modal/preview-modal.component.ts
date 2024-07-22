import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { ClassicCardComponent } from '../../common/common-main-page/components/classic-card/classic-card.component';
import { ModernCardComponent } from '../../common/common-main-page/components/modern-card/modern-card.component';
import { ModalComponent } from '../bootstrap-modal/bootstrap-modal.component';
import { ROOM_USER } from '../../../shared/models/roomUser.model';
import { ICON_CLASS } from '../../../../../public/assets/icons_class/icon_class';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'fhv-preview-modal',
  standalone: true,
  imports: [
    CommonModule,
    ClassicCardComponent,
    ModernCardComponent,
    ModalComponent,
    TranslateModule,
  ],
  templateUrl: './preview-modal.component.html',
  styleUrl: './preview-modal.component.scss',
})
export class PreviewModalComponent {
  //TODO v18
  @Input() roomUser: ROOM_USER;
  readonly ICON_CLASS = ICON_CLASS;
  changeVersion: boolean = true;

  changeVersionFlag(): void {
    this.changeVersion = !this.changeVersion;
  }
}
