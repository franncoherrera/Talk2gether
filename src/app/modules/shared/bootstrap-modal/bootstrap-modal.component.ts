import { CommonModule } from '@angular/common';
import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { CustomModalService } from '../../../shared/services/custom-modal.service';

@Component({
  selector: 'fhv-bootstrap-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bootstrap-modal.component.html',
  styleUrl: './bootstrap-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  modalTitle = input.required<string>();

  private customModalService: CustomModalService = inject(CustomModalService);

  closeModal(): void {
    this.customModalService.closeActiveModal();
  }
}
