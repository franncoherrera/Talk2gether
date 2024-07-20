import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';

@Component({
  selector: 'fhv-classic-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './classic-card.component.html',
  styleUrl: './classic-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ClassicCardComponent {
  readonly ICON_CLASS = ICON_CLASS;
  room = input.required<ROOM_USER>();
}
