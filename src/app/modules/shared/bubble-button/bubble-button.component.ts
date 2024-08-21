import { Component, input, viewChild } from '@angular/core';

@Component({
  selector: 'fhv-bubble-button',
  standalone: true,
  templateUrl: './bubble-button.component.html',
  styleUrl: './bubble-button.component.scss',
})
export class BubbleButtonComponent {
  iconClass = input<string>('');
  labelButton = input.required<string>();
}
