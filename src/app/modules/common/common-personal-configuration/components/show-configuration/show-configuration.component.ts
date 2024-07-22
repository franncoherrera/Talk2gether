import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormService } from '../../../../../shared/services/form.service';
import { InterestLabelComponent } from '../../../../shared/interest-label/interest-label.component';

@Component({
  selector: 'fhv-show-configuration',
  standalone: true,
  imports: [CommonModule, TranslateModule, InterestLabelComponent],
  templateUrl: './show-configuration.component.html',
  styleUrl: './show-configuration.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ShowConfigurationComponent {
  showPersonalData = output<boolean>();
  formControl = input<FormGroup>();
  protected formService: FormService = inject(FormService);
}
