import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { BreakPointService } from '../../../../../shared/services/break-point.service';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { PAGINATION } from '../../../../../shared/constants/paginationConstants';

@Component({
  selector: 'fhv-modern-card',
  templateUrl: './modern-card.component.html',
  styleUrl: './modern-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ModernCardComponent {
  readonly ICON_CLASS = ICON_CLASS;
  readonly PAGINATION = PAGINATION;
  page: number;
  @Input() userRoom: ROOM_USER[];
  
  constructor(protected breakPointService: BreakPointService) {}
}
