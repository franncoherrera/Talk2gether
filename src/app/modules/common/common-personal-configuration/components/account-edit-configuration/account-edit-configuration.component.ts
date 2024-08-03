import { Component, inject } from '@angular/core';
import { CUSTOM_MODAL_CONFIG } from '../../../../../shared/constants/customModalRefConfig';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { BloquedUserModalComponent } from '../../../../shared/bloqued-user-modal/bloqued-user-modal.component';

@Component({
  selector: 'fhv-account-edit-configuration',
  templateUrl: './account-edit-configuration.component.html',
  styleUrl: './account-edit-configuration.component.scss',
})
export class AccountEditConfigurationComponent {
  private readonly customModalService: CustomModalService =
    inject(CustomModalService);

  getBloquedUserModal() {
    this.customModalService.open(
      BloquedUserModalComponent,
      CUSTOM_MODAL_CONFIG
    );
  }
}
