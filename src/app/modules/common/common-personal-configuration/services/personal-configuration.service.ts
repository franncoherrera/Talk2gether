import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CUSTOM_MODAL_CONFIG } from '../../../../shared/constants/customModalRefConfig';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { CHANGE_PASS } from '../../../../shared/models/changePassWord.model';
import { CONFIG_USER } from '../../../../shared/models/configUser.model';
import { CustomModalService } from '../../../../shared/services/custom-modal.service';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { PreviewModalComponent } from '../../../shared/preview-modal/preview-modal.component';

@Injectable({
  providedIn: 'root',
})
export class PersonalConfigurationService {
  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);
  private httpClient: HttpClient = inject(HttpClient);
  private customModalService: CustomModalService = inject(CustomModalService);

  getPersonalData(idUser: number): Observable<CONFIG_USER> {
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.CONFIG_DATA, {
      id: idUser,
    });
    return this.httpClient.get<CONFIG_USER>(url);
  }

  editUser(idUser: number, user: any): Observable<string> {
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.EDIT_DATA, {
      id: idUser,
    });
    return this.httpClient.put(url, user, { responseType: 'text' });
  }

  changePassword(body: CHANGE_PASS): Observable<Object> {
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.CHANGE_PASS);
    return this.httpClient.put(url, body);
  }

  openPreviewCard(formControl: FormGroup, image: string | ArrayBuffer): void {
    /** TODO View flags */
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
      intereses: formControl.get('interest').value.map((item) => item.name),
      linkReunionVirtual: '',
      nombreNivelIdioma: formControl.get('languageLevel').value,
      nombrePais: formControl.get('country'),
      nombreUsuario:
        formControl.get('userName').value +
        ' ' +
        formControl.get('userSurname').value,
      urlBandera: 'xk',
      urlFoto: image,
    };
  }
}
