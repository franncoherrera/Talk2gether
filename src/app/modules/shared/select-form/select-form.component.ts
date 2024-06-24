import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
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
  @Input() formGroup: FormGroup;
  @Input() control: FormControl;
  @Input() name: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() options: Array<{}>;
  @Input() clearable: boolean = false;
  @Input() searchable: boolean = false;
  @Input() submitForm: boolean;
  selectFormGroup: FormGroup;
  isSelected: boolean = false;

  ngOnInit(): void {
    this.selectFormGroup = !!this.formGroup
      ? new FormGroup({
          selectControlName: new FormControl(null),
        })
      : new FormGroup({
          selectControlName: new FormControl(this.control),
        });
  }

  onSelectFocus() {
    this.isSelected = !this.isSelected;
  }
  onSelectChange(event: any) {
    if (!!event?.$ngOptionLabel) {
      this.control.setValue(event?.$ngOptionLabel);
    } else {
      this.control.setValue(event);
    }
  }

  onSelectBlur() {
    this.isSelected = !this.isSelected;
  }

}
