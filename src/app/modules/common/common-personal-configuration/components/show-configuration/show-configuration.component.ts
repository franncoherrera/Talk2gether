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
import { PreviewModalComponent } from '../../../../shared/preview-modal/preview-modal.component';
import { PersonalConfigurationService } from '../../services/personal-configuration.service';

@Component({
  selector: 'fhv-show-configuration',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    InterestLabelComponent,
    PreviewModalComponent,
  ],
  templateUrl: './show-configuration.component.html',
  styleUrl: './show-configuration.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ShowConfigurationComponent {
  showPersonalData = output<boolean>();
  formGroup = input<FormGroup>();
  protected formService: FormService = inject(FormService);
  protected personalConfigurationService: PersonalConfigurationService = inject(
    PersonalConfigurationService
  );
}
