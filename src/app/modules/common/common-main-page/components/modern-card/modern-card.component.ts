import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { PAGINATION } from '../../../../../shared/constants/paginationConstants';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { BreakPointService } from '../../../../../shared/services/break-point.service';

@Component({
  selector: 'fhv-modern-card',
  templateUrl: './modern-card.component.html',
  styleUrl: './modern-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModernCardComponent {
  readonly ICON_CLASS = ICON_CLASS;
  readonly PAGINATION = PAGINATION;
  page: number;
  userRoom = input.required<ROOM_USER[]>();

  protected breakPointService: BreakPointService = inject(BreakPointService);
}
