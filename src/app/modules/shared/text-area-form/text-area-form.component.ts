import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormErrorComponent } from '../form-error/form-error.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'fhv-text-area-form',
  standalone: true,
  imports: [CommonModule, FormErrorComponent, ReactiveFormsModule],
  templateUrl: './text-area-form.component.html',
  styleUrl: './text-area-form.component.scss',
})
export class TextAreaFormComponent {
  @Input() formGroup: FormGroup;
  @Input() control: FormControl;
  @Input() name: string;
  @Input() label: string;
  @Input() minlength?: string;
  @Input() maxlength?: string;
  @Input() placeholder?: string;
  @Input() submitForm: boolean;

}
