import { inject, Injectable } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class CustomModalService {
  private modals: NgbModalRef[] = [];

  private ngbModalService: NgbModal = inject(NgbModal);

  /**
   * Opens a new modal dialog with the specified content and options.
   *
   * @param content The content to be displayed in the modal.
   * @param options Optional configuration options for the modal.
   * @returns A reference to the newly opened modal.
   */
  open(content: any, options?: NgbModalOptions): NgbModalRef {
    let activeModal: NgbModalRef;
    activeModal = this.ngbModalService.open(content, options);
    this.modals.push(activeModal);
    this.handleModalRemoveEvents(activeModal);
    return activeModal;
  }

  /**
   * Handles the removal of a modal from the list of active modals once it has been closed or dismissed.
   *
   * @param modal The modal reference to be handled for removal.
   */
  protected handleModalRemoveEvents(modal: NgbModalRef): void {
    modal.result.finally(() => {
      this.modals = this.modals.filter((m) => m !== modal);
    });
  }

  /**
   * Retrieves the currently active modal.
   *
   * @returns The most recently opened modal reference, or `undefined` if no modals are active.
   */
  getActiveModal(): NgbModalRef {
    const modal = this.modals[this.modals.length - 1];
    return modal;
  }

  /**
   * Dismisses the currently active modal with an optional reason.
   *
   * @param reason Optional reason for dismissing the modal.
   */
  dismissActiveModal(reason?: any): void {
    const modal: NgbModalRef = this.getActiveModal();
    if (modal) {
      modal.dismiss(reason);
    }
  }

  /**
   * Closes the currently active modal with an optional reason.
   *
   * @param reason Optional reason for closing the modal.
   */
  closeActiveModal(reason?: any): void {
    const modal: NgbModalRef = this.getActiveModal();
    if (modal) {
      modal.close(reason);
    }
  }
}
