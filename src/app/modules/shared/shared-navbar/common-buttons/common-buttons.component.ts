import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ICON_CLASS } from '../../../../../../public/assets/icons_class/icon_class';
import { ROUTES_PATH } from '../../../../shared/constants/routes';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { CustomModalService } from '../../../../shared/services/custom-modal.service';
import { CUSTOM_MODAL_CONFIG } from '../../../../shared/constants/customModalRefConfig';
import { CommonReferralLinkComponent } from '../../../common/common-referral-link/common-referral-link.component';

@Component({
  selector: 'fhv-common-buttons',
  templateUrl: './common-buttons.component.html',
  styleUrl: './common-buttons.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CommonButtonsComponent {
  readonly ICON_CLASS = ICON_CLASS;
  readonly ROUTES_PATH = ROUTES_PATH;
  @Output() closeNavbar: EventEmitter<void> = new EventEmitter();

  constructor(
    protected sesionService: SesionService,
    private customModalService: CustomModalService
  ) {}

  closeNavbarChild(): void {
    this.closeNavbar.emit();
  }

  openReferralLinkModal(): void {
    this.customModalService.open(
      CommonReferralLinkComponent,
      CUSTOM_MODAL_CONFIG
    );
  }
}
