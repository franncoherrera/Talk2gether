import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'fhv-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  @Input() modalTitle: string;
  @Output() loadComponent: EventEmitter<boolean> = new EventEmitter();

  closeModal() {
    this.loadComponent.emit(false);
  }
}
