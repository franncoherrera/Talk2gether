import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedNavbarComponent } from './modules/shared/shared-navbar/shared-navbar.component';
import { LANGUAGE } from './shared/enums/languages.enum';

@Component({
  selector: 'fhv-root',
  standalone: true,
  imports: [RouterOutlet, SharedNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Talk2gether';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(LANGUAGE.SPANISH);
    const browserLang: string = this.translateService.getBrowserLang() || LANGUAGE.SPANISH;
    this.translateService.use(Object.values(LANGUAGE).includes(browserLang as LANGUAGE) ? browserLang : 'es');
  }
}
