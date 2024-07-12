import { Component, Input } from '@angular/core';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';

@Component({
  selector: 'fhv-classic-card',
  templateUrl: './classic-card.component.html',
  styleUrl: './classic-card.component.scss'
})
export class ClassicCardComponent {
  readonly ICON_CLASS = ICON_CLASS;
  @Input() userRoom: ROOM_USER[];
}
