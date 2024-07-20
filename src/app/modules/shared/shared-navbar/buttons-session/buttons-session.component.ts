import {
  Component,
  output,
  ViewEncapsulation
} from '@angular/core';
import { ICON_CLASS } from '../../../../../../public/assets/icons_class/icon_class';
import { ROUTES_PATH } from '../../../../shared/constants/routes';
import { SesionService } from '../../../../shared/interceptors/sesion.service';

@Component({
  selector: 'fhv-buttons-session',
  templateUrl: './buttons-session.component.html',
  styleUrl: './buttons-session.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonsSessionComponent {
  readonly ICON_CLASS = ICON_CLASS;
  readonly ROUTES_PATH = ROUTES_PATH;
  closeNavbar = output<void>();
  constructor(protected sesionService: SesionService) {}

  closeNavbarChild(): void {
    this.closeNavbar.emit();
  }
}
