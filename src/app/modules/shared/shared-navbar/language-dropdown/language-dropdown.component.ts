import {
  Component,
  EventEmitter,
  inject,
  output,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ICON_CLASS } from '../../../../../../public/assets/icons_class/icon_class';
import { LANGUAGE } from '../../../../shared/enums/languages.enum';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { BreakPointService } from '../../../../shared/services/break-point.service';
import { FLAG_ICON_CLASS } from '../../../../../../public/assets/icons_class/flag_icon_class';

@Component({
  selector: 'fhv-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LanguageDropdownComponent {
  readonly LANGUAGE = LANGUAGE;
  readonly ICON_CLASS = ICON_CLASS;
  readonly FLAG_ICON_CLASS = FLAG_ICON_CLASS;
  closeNavbar = output<void>();
  
  private translateService: TranslateService = inject(TranslateService);
  protected sesionService: SesionService = inject(SesionService);
  protected breakPointService: BreakPointService = inject(BreakPointService);

  switchLanguage(language: string): void {
    if (Object.values(LANGUAGE).includes(language as LANGUAGE)) {
      this.translateService.use(language);
      localStorage.setItem('selectedLang', language);
      location.reload();
    }
  }

  closeNavbarChild(): void {
    this.closeNavbar.emit();
  }
}
