import { inject, Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class CustomModalService {
  private modals: NgbModalRef[] = [];

  private ngbModalService: NgbModal = inject(NgbModal);

  open(content: any, options?: NgbModalOptions): NgbModalRef {
    let activeModal: NgbModalRef;
    activeModal = this.ngbModalService.open(content, options);
    this.modals.push(activeModal);
    this.handleModalRemoveEvents(activeModal);
    return activeModal;
  }

  protected handleModalRemoveEvents(modal: NgbModalRef): void {
    modal.result.finally(() => {
      this.modals = this.modals.filter((m) => m !== modal);
    });
  }

  getActiveModal(): NgbModalRef {
    const modal = this.modals[this.modals.length - 1];
    return modal;
  }

  dismissActiveModal(reason?: any): void {
    const modal: NgbModalRef = this.getActiveModal();
    if (modal) {
      modal.dismiss(reason);
    }
  }

  closeActiveModal(reason?: any): void {
    const modal: NgbModalRef = this.getActiveModal();
    if (modal) {
      modal.close(reason);
    }
  }
}
