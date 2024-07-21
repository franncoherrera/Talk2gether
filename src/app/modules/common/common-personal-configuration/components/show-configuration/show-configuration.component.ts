import { CommonModule } from '@angular/common';
import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { CONFIG_USER } from '../../../../../shared/models/configUser.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'fhv-show-configuration',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './show-configuration.component.html',
  styleUrl: './show-configuration.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ShowConfigurationComponent {
  personalData = input.required<CONFIG_USER>();
  showPersonalData = output<boolean>();
}
