import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Talk2gether';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    const browserLang: string = this.translate.getBrowserLang() || 'es';
    this.translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
  }

  switchLanguage(language: string) {
    this.translate.use('language');
  }
}
