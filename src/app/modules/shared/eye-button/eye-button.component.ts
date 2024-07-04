import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ICON_CLASS } from '../../../../../public/assets/icons_class/icon_class';
import { CommonModule } from '@angular/common';
import { INPUT_TYPE } from '../../../shared/enums/input-type.enum';

@Component({
  selector: 'fhv-eye-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eye-button.component.html',
  styleUrl: './eye-button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EyeButtonComponent {
  /* Show and hide password variable */
  @Output() passwordTypeEmitter: EventEmitter<string> = new EventEmitter();
  readonly ICON_CLASS = ICON_CLASS;
  showPassword: boolean = false;

  togglePasswordView(fromRepeat: boolean = false): void {
    if (!fromRepeat) {
      this.showPassword = !this.showPassword;
      if (this.showPassword) {
        this.passwordTypeEmitter.emit(INPUT_TYPE.TEXT);
      } else {
        this.passwordTypeEmitter.emit(INPUT_TYPE.PASSWORD);
      }
    }
  }
}
