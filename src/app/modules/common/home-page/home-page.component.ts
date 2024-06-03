import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { common_home_page } from '../../../translations/es/common/common_message_home_page_es';

@Component({
  selector: 'fhv-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  common_home_page = common_home_page;
}
