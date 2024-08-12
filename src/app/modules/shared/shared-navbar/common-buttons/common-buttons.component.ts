import {
  Component,
  inject,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ICON_CLASS } from '../../../../../../public/assets/icons_class/icon_class';
import { CUSTOM_MODAL_CONFIG } from '../../../../shared/constants/customModalRefConfig';
import { ALLOW_PAGE } from '../../../../shared/constants/playTourSteps';
import { ROUTES_PATH } from '../../../../shared/constants/routes';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { CustomModalService } from '../../../../shared/services/custom-modal.service';
import { PlayTourService } from '../../../../shared/services/play-tour.service';
import { UserService } from '../../../../shared/services/user.service';
import { CommonReferralLinkComponent } from '../../../common/common-referral-link/common-referral-link.component';

@Component({
  selector: 'fhv-common-buttons',
  templateUrl: './common-buttons.component.html',
  styleUrl: './common-buttons.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CommonButtonsComponent implements OnInit {
  readonly ICON_CLASS = ICON_CLASS;
  readonly ROUTES_PATH = ROUTES_PATH;
  userId$: Observable<number>;
  closeNavbar = output<void>();
  currentUrl = input.required<string>();

  protected readonly sesionService: SesionService = inject(SesionService);
  private readonly customModalService: CustomModalService =
    inject(CustomModalService);
  protected readonly playTourService: PlayTourService = inject(PlayTourService);
  private readonly userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.userId$ = this.userService.getIdUser();
  }
  closeNavbarChild(): void {
    this.closeNavbar.emit();
  }

  openReferralLinkModal(): void {
    this.customModalService.open(
      CommonReferralLinkComponent,
      CUSTOM_MODAL_CONFIG
    );
  }

  getAllowUrl(): boolean {
    return ALLOW_PAGE.includes(this.currentUrl());
  }
}
