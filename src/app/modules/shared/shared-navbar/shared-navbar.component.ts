import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fhv-shared-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './shared-navbar.component.html',
  styleUrl: './shared-navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SharedNavbarComponent {

  constructor(private translateService: TranslateService){

  }


  switchLanguage(language: string) {
    this.translateService.use(language);
  }
}
