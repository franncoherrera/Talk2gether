import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EyeButtonComponent } from '../eye-button/eye-button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'fhv-input-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    EyeButtonComponent,
    ReactiveFormsModule,
    FormErrorComponent
  ],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
})
export class InputFormComponent {
  initialType: boolean;
  @Input() formGroup: FormGroup;
  @Input() name: string;
  @Input() label: string;
  @Input() type: string;
  @Input() minlength?: string;
  @Input() maxlength?: string;
  @Input() placeholder: string;
  @Input() required: string;
  constructor() {}

  ngOnInit() {
    this.type === 'password'
      ? (this.initialType = true)
      : (this.initialType = false);
  }

  updatePasswordType(event: string): void {
    this.type = event;
  }
}
