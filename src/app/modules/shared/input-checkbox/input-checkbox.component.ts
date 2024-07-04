import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormErrorComponent } from '../form-error/form-error.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { INPUT_TYPE } from '../../../shared/enums/input-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'fhv-input-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormErrorComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.scss',
})
export class InputCheckboxComponent {
  isChecked: boolean = false;
  readonly INPUT_TYPE = INPUT_TYPE;
  @Input() formGroup: FormGroup;
  @Input() control: FormControl;
  @Input() name: string;
  @Input() label: string;
  @Input() submitForm: boolean;
  @Input() labelRoute: string;

  constructor(private router: Router) {}

  onCheckboxChange(isChecked: boolean): void {
    this.isChecked = isChecked;
    this.control.setValue(this.isChecked);
  }

  redirectLabel(): void {
    if (!!this.labelRoute) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([this.labelRoute])
      );
      window.open(url, '_blank');
    }
  }
}
