import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'fhv-form-error',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
})
export class FormErrorComponent {
  showError = input.required<boolean>();
  errorMessage = input<string>();
  control = input<FormControl>();
}
