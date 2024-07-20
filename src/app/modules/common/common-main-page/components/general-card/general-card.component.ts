import { Component, input, ViewEncapsulation } from '@angular/core';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { PAGINATION } from '../../../../../shared/constants/paginationConstants';

@Component({
  selector: 'fhv-general-card',
  templateUrl: './general-card.component.html',
  styleUrl: './general-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class GeneralCardComponent {
  readonly PAGINATION = PAGINATION;
  page: number;
  userRoom = input.required<ROOM_USER[]>();
  isClassicVersion = input.required<boolean>();
}
