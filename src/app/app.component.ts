import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedNavbarComponent } from './modules/shared/shared-navbar/shared-navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Talk2gether';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    const browserLang: string = this.translateService.getBrowserLang() || 'es';
    this.translateService.use(browserLang.match(/en|es/) ? browserLang : 'es');
  }
}
