import { Component, Input } from '@angular/core';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { BreakPointService } from '../../../../../shared/services/break-point.service';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';

@Component({
  selector: 'fhv-modern-card',
  templateUrl: './modern-card.component.html',
  styleUrl: './modern-card.component.scss',
})
export class ModernCardComponent {
  readonly ICON_CLASS = ICON_CLASS;
  @Input() userRoom: ROOM_USER[];
  
  constructor(protected breakPointService: BreakPointService) {}
}
