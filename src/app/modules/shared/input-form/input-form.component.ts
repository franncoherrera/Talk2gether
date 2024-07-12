import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { INPUT_TYPE } from '../../../shared/enums/input-type.enum';
import { EyeButtonComponent } from '../eye-button/eye-button.component';
import { FormErrorComponent } from '../form-error/form-error.component';
import { ICON_CLASS } from '../../../../../public/assets/icons_class/icon_class';

@Component({
  selector: 'fhv-input-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    EyeButtonComponent,
    ReactiveFormsModule,
    FormErrorComponent,
  ],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
})
export class InputFormComponent {
  initialType: boolean;
  readonly INPUT_TYPE = INPUT_TYPE;
  readonly ICON_CLASS = ICON_CLASS;
  @Input() formGroup: FormGroup;
  @Input() control: FormControl;
  @Input() name: string;
  @Input() label: string;
  @Input() type: string;
  @Input() minlength?: string;
  @Input() maxlength?: string;
  @Input() placeholder?: string;
  @Input() submitForm: boolean;
  @Input() accept?: string;

  ngOnInit() {
    this.type === INPUT_TYPE.PASSWORD
      ? (this.initialType = true)
      : (this.initialType = false);
  }

  updatePasswordType(event: string): void {
    this.type = event;
  }
}
