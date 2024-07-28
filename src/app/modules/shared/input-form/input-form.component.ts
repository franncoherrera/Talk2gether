import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  model,
  OnInit,
  output,
  signal,
  WritableSignal
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ICON_CLASS } from '../../../../../public/assets/icons_class/icon_class';
import { INPUT_TYPE } from '../../../shared/enums/input-type.enum';
import { EyeButtonComponent } from '../eye-button/eye-button.component';
import { FormErrorComponent } from '../form-error/form-error.component';

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
export class InputFormComponent implements OnInit {
  initialType: boolean;
  isCopied: WritableSignal<string> = signal(null);
  readonly INPUT_TYPE = INPUT_TYPE;
  readonly ICON_CLASS = ICON_CLASS;
  formGroup = input.required<FormGroup>();
  control = input.required<FormControl>();
  name = input.required<string>();
  label = input<string>();
  type = model<string>();
  minlength = input<string>();
  maxlength = input<string>();
  placeholder = input<string>();
  submitForm = input<boolean>();
  accept = input<string>();
  readonly = input<boolean>();
  isCopyiable = input<boolean>();
  value = input<string>('')
  search = output<void>();

  ngOnInit() {
    this.type() === INPUT_TYPE.PASSWORD
      ? (this.initialType = true)
      : (this.initialType = false);
  }

  updatePasswordType(event: string): void {
    this.type.set(event);
  }

  copyToClipboard(): void {
    this.isCopied.set('copied');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.value());
      setTimeout(() => {
        this.isCopied.set(null);
      }, 1500);
    }
  }

  emit() {
    this.search.emit();
  }
}
