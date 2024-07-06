import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedNavbarComponent } from './modules/shared/shared-navbar/shared-navbar.component';
import { LANGUAGE } from './shared/enums/languages.enum';
import { SpinnerGeneralModule } from './modules/shared/spinner-general/spinner-general.module';

@Component({
  selector: 'fhv-root',
  standalone: true,
  imports: [RouterOutlet, SharedNavbarComponent, SpinnerGeneralModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Talk2gether';

  constructor(private translateService: TranslateService) {
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
