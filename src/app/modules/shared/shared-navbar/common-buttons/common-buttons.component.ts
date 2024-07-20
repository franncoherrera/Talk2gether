import {
  Component,
  inject,
  output,
  ViewEncapsulation
} from '@angular/core';
import { ICON_CLASS } from '../../../../../../public/assets/icons_class/icon_class';
import { CUSTOM_MODAL_CONFIG } from '../../../../shared/constants/customModalRefConfig';
import { ROUTES_PATH } from '../../../../shared/constants/routes';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { CustomModalService } from '../../../../shared/services/custom-modal.service';
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
  closeNavbar = output<void>();

  protected sesionService: SesionService = inject(SesionService);
  private customModalService: CustomModalService = inject(CustomModalService);
  

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
