import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from '../enums/languages.enum';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateService {
  private translateService: TranslateService = inject(TranslateService);

  setLanguage(): void {
    this.translateService.setDefaultLang(LANGUAGE.SPANISH);
    const browserLang: string =
      this.translateService.getBrowserLang() || LANGUAGE.SPANISH;
    const savedLang: string =
      localStorage.getItem('selectedLang') || browserLang;
    localStorage.setItem(
      'selectedLang',
      localStorage.getItem('selectedLang') || browserLang
    );
    this.translateService.use(
      Object.values(LANGUAGE).includes(savedLang as LANGUAGE) ? savedLang : 'es'
    );
  }
}
