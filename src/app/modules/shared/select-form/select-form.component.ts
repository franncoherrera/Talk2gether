import { CommonModule } from '@angular/common';
import { Component, input, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'fhv-select-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormErrorComponent,
  ],
  templateUrl: './select-form.component.html',
  styleUrl: './select-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SelectFormComponent {
  formGroup = input.required<FormGroup>();
  control = input.required<FormControl>();
  name = input.required<string>();
  label = input.required<string>();
  placeholder = input.required<string>();
  options = input.required< Array<{}>>();
  clearable = input<boolean>(false);
  searchable = input<boolean>(false);
  submitForm = input<boolean>(false);

  selectFormGroup: FormGroup;
  isSelected: boolean = false;

  ngOnInit(): void {
    this.selectFormGroup = !!this.formGroup()
      ? new FormGroup({
          selectControlName: new FormControl(null),
        })
      : new FormGroup({
          selectControlName: new FormControl(this.control),
        });
  }

  onSelectFocus(): void {
    this.isSelected = !this.isSelected;
  }
  onSelectChange(event): void {
    if (!!event?.$ngOptionLabel) {
      this.control().setValue(event?.$ngOptionLabel);
    } else {
      this.control().setValue(event);
    }
  }

  onSelectBlur(): void {
    this.isSelected = !this.isSelected;
  }
}
