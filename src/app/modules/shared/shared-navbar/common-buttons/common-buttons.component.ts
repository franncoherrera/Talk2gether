import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ICON_CLASS } from '../../../../../../public/assets/icons_class/icon_class';
import { ROUTES_PATH } from '../../../../shared/constants/routes';
import { SesionService } from '../../../../shared/interceptors/sesion.service';

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

  constructor(protected sesionService: SesionService) {}

  closeNavbarChild(): void {
    this.closeNavbar.emit();
  }
}
