import {
  Component,
  ElementRef,
  inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ICON_CLASS } from '../../../../../../public/assets/icons_class/icon_class';
import { GENERAL_PATH, ROUTES_PATH } from '../../../../shared/constants/routes';
import { LANGUAGE } from '../../../../shared/enums/languages.enum';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { BreakPointService } from '../../../../shared/services/break-point.service';

@Component({
  selector: 'fhv-shared-navbar',
  templateUrl: './shared-navbar.component.html',
  styleUrl: './shared-navbar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SharedNavbarComponent {
  readonly LANGUAGE = LANGUAGE;
  readonly ICON_CLASS = ICON_CLASS;
  readonly ROUTES_PATH = ROUTES_PATH;
  readonly GENERAL_PATH = GENERAL_PATH;

  @ViewChild('navbarToggler') navbarToggler: ElementRef;
  @ViewChild('thrower') navbarContent: ElementRef;

  protected sesionService: SesionService = inject(SesionService);
  protected breakPointService: BreakPointService = inject(BreakPointService);

  closeNavbar() {
    const navbar = document.querySelector('#navbarSupportedContent');
    if (navbar && navbar.classList.contains('show')) {
      this.navbarToggler.nativeElement.click();
      this.navbarContent.nativeElement.click();
    }
  }
}
