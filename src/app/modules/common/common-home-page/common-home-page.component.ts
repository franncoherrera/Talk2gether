import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'fhv-common-home-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './common-home-page.component.html',
  styleUrl: './common-home-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CommonHomePageComponent {}
