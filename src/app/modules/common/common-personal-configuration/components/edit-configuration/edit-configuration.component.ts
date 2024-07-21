import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CONFIG_USER } from '../../../../../shared/models/configUser.model';

@Component({
  selector: 'fhv-edit-configuration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-configuration.component.html',
  styleUrl: './edit-configuration.component.scss',
})
export class EditConfigurationComponent {
  personalData = input.required<CONFIG_USER>();
  showPersonalData = output<boolean>();
}
