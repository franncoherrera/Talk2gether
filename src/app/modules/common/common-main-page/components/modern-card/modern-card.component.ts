import { CommonModule } from '@angular/common';
import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { BreakPointService } from '../../../../../shared/services/break-point.service';
import { GeneralCardComponent } from '../general-card/general-card.component';

@Component({
  selector: 'fhv-modern-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './modern-card.component.html',
  styleUrl: './modern-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModernCardComponent extends GeneralCardComponent {
  room = input.required<ROOM_USER>();

  protected breakPointService: BreakPointService = inject(BreakPointService);
}
