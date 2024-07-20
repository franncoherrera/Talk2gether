import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
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
  formGroup = input.required<FormGroup>();
  control = input.required<FormControl>();
  name = input.required<string>();
  label = input.required<string>();
  placeholder = input.required<string>();
  submitForm = input<boolean>();
  minlength = input<string>();
  maxlength = input<string>();
}
