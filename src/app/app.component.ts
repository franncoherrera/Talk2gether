import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedNavbarModule } from './modules/shared/shared-navbar/shared-navbar/shared-navbar.module';
import { SpinnerGeneralModule } from './modules/shared/spinner-general/spinner-general.module';
import { CustomTranslateService } from './shared/services/custom-translate.service';
import "driver.js/dist/driver.css";

@Component({
  selector: 'fhv-root',
  standalone: true,
  imports: [RouterOutlet, SharedNavbarModule, SpinnerGeneralModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Talk2gether';

  private customTranslateService = inject(CustomTranslateService);

  ngOnInit() {
    this.customTranslateService.setLanguage();
  }
}
