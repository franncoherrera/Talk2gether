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
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { CUSTOM_MODAL_CONFIG } from '../../../../../shared/constants/customModalRefConfig';

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
  formControl = input<FormGroup>();
  protected formService: FormService = inject(FormService);
  private customModalService: CustomModalService = inject(CustomModalService);

  openPreviewCard() {
    const modalRef = this.customModalService.open(
      PreviewModalComponent,
      CUSTOM_MODAL_CONFIG
    );
    /* This is an example that is shown to the user without importing hardcoded data */
    modalRef.componentInstance.roomUser = {
      cantidadEstrellas: 5,
      edad: 18,
      idCuenta: null,
      idReunionVirtual: null,
      intereses: this.formControl()
        .get('interest')
        .value.map((item) => item.name),
      linkReunionVirtual: '',
      nombreNivelIdioma: this.formControl().get('languageLevel').value,
      nombrePais: this.formControl().get('country'),
      nombreUsuario:
        this.formControl().get('userName').value +
        ' ' +
        this.formControl().get('userSurname').value,
      urlBandera: 'xk',
      urlFoto: this.formControl().get('urlPhoto').value,
    };
  }
}
