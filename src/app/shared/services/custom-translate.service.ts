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

  /**
   * Sets the language for the application.
   *
   * This method configures the default language, retrieves the browser's preferred language,
   * and sets the selected language from local storage if available. It then applies the selected
   * language using the `TranslateService`.
   */
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

  /**
   * Returns the language that matches the saved language or defaults to Spanish.
   *
   * This method checks if the saved language exists in the available languages.
   * If it does, it returns the saved language; otherwise, it returns Spanish as the default language.
   *
   * @returns The language code that matches the saved language or Spanish if no match is found.
   */
  getMatchLanguage(): string {
    return Object.values(LANGUAGE).includes(this.savedLang as LANGUAGE)
      ? this.savedLang
      : LANGUAGE.SPANISH;
  }
}
