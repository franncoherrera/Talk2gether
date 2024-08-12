import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from '../enums/languages.enum';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateService {
  private translateService: TranslateService = inject(TranslateService);
  private browserLang: string;
  private savedLang: string;
  setLanguage(): void {
    this.translateService.setDefaultLang(LANGUAGE.SPANISH);
    this.browserLang =
      this.translateService.getBrowserLang() || LANGUAGE.SPANISH;
    this.savedLang = localStorage.getItem('selectedLang') || this.browserLang;
    localStorage.setItem(
      'selectedLang',
      localStorage.getItem('selectedLang') || this.browserLang
    );
    this.translateService.use(this.getMatchLanguage());
  }

  getMatchLanguage(): string {
    return Object.values(LANGUAGE).includes(this.savedLang as LANGUAGE)
      ? this.savedLang
      : LANGUAGE.SPANISH;
  }
}
