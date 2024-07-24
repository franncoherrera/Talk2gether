import { CommonModule } from '@angular/common';
import { Component, input, OnInit, ViewEncapsulation } from '@angular/core';
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
export class SelectFormComponent implements OnInit {
  formGroup = input.required<FormGroup>();
  control = input.required<FormControl>();
  name = input.required<string>();
  label = input.required<string>();
  placeholder = input.required<string>();
  options = input.required<Array<{}>>();
  clearable = input<boolean>(false);
  searchable = input<boolean>(false);
  submitForm = input<boolean>(false);

  selectFormGroup: FormGroup;
  isSelected: boolean = false;

  ngOnInit(): void {
    if (!this.areAllControlsFilled()) {
      this.selectFormGroup = new FormGroup({
        selectControlName: new FormControl(null),
      });
    }
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

  areAllControlsFilled(): boolean {
    for (const controlName in this.formGroup().controls) {
      if (this.formGroup().controls.hasOwnProperty(controlName)) {
        const control = this.formGroup().controls[controlName];
        if (!control.value) {
          return false;
        }
      }
    }
    return true;
  }

  onSelectBlur(): void {
    this.isSelected = !this.isSelected;
  }
}
