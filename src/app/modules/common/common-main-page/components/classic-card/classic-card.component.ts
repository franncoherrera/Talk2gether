import { Component, input, ViewEncapsulation } from '@angular/core';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { PAGINATION } from '../../../../../shared/constants/paginationConstants';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';

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
  userRoom = input.required<ROOM_USER[]>();
}
