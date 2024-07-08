import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ICON_CLASS } from '../../../../../public/assets/icons_class/icon_class';
import { GENERAL_PATH, ROUTES_PATH } from '../../../shared/constants/routes';
import { LANGUAGE } from '../../../shared/enums/languages.enum';
import { SesionService } from '../../../shared/interceptors/sesion.service';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';

@Component({
  selector: 'fhv-shared-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, ToggleButtonComponent],
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

  constructor(
    private translateService: TranslateService,
    protected sesionService: SesionService
  ) {}

  switchLanguage(language: string): void {
    if (Object.values(LANGUAGE).includes(language as LANGUAGE)) {
      this.translateService.use(language);
      localStorage.setItem('selectedLang', language);
      this.closeNavbar();
    }
  }

  closeNavbar() {
    const navbar = document.querySelector('#navbarSupportedContent');
    if (navbar && navbar.classList.contains('show')) {
      this.navbarToggler.nativeElement.click();
      this.navbarContent.nativeElement.click();
    }
  }
}
