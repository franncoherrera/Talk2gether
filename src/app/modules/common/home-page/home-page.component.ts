import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'fhv-home-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent {}
