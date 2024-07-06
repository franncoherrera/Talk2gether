import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from '../../../shared/enums/languages.enum';

@Component({
  selector: 'fhv-shared-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './shared-navbar.component.html',
  styleUrl: './shared-navbar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SharedNavbarComponent {
  readonly LANGUAGE = LANGUAGE;
  constructor(private translateService: TranslateService) {}

  switchLanguage(language: string): void {
    if (Object.values(LANGUAGE).includes(language as LANGUAGE)) {
      this.translateService.use(language);
      localStorage.setItem('selectedLang', language);
      location.reload();
    }
  }
}
