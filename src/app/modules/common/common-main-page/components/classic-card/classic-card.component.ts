import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { PAGINATION } from '../../../../../shared/constants/paginationConstants';

@Component({
  selector: 'fhv-classic-card',
  templateUrl: './classic-card.component.html',
  styleUrl: './classic-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ClassicCardComponent {
  readonly ICON_CLASS = ICON_CLASS;
  readonly PAGINATION = PAGINATION;
  page: number;

  @Input() userRoom: ROOM_USER[];
}
