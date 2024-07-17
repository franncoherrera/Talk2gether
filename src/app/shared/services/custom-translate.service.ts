import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from '../enums/languages.enum';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateService {
  constructor(private translateService: TranslateService) {}

  setLanguage() {
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
