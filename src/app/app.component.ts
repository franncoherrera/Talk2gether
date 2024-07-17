import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerGeneralModule } from './modules/shared/spinner-general/spinner-general.module';
import { LANGUAGE } from './shared/enums/languages.enum';
import { SharedNavbarModule } from './modules/shared/shared-navbar/shared-navbar/shared-navbar.module';
import { CustomTranslateService } from './shared/services/custom-translate.service';

@Component({
  selector: 'fhv-root',
  standalone: true,
  imports: [RouterOutlet, SharedNavbarModule, SpinnerGeneralModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Talk2gether';

  constructor(private customTranslateService: CustomTranslateService) {
    this.customTranslateService.setLanguage();
  }
}
