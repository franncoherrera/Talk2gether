import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() showError: boolean;
  @Input() errorMessage?: string;
  @Input() control: FormControl;
}
