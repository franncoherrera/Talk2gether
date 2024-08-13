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
import { DELETE_ACOUNT_USER } from '../../../../shared/models/deleteAccountUser.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalConfigurationService {
  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);
  private httpClient: HttpClient = inject(HttpClient);
  private customModalService: CustomModalService = inject(CustomModalService);

  /**
   * Retrieves the personal data for a specific user based on their ID.
   *
   * @param idUser - The ID of the user whose personal data is being retrieved.
   *
   * @returns An observable emitting a `CONFIG_USER` object containing the user's personal data.
   */
  getPersonalData(idUser: number): Observable<CONFIG_USER> {
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.CONFIG_DATA, {
      id: idUser,
    });
    return this.httpClient.get<CONFIG_USER>(url);
  }

  /**
   * Edits the user data for a specific user based on their ID.
   *
   * @param idUser - The ID of the user whose data is being edited.
   * @param user - An object containing the new user data to be updated.
   *
   * @returns An observable emitting a string response from the server indicating the result of the operation.
   */
  editUser(idUser: number, user: any): Observable<string> {
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.EDIT_DATA, {
      id: idUser,
    });
    return this.httpClient.put(url, user, { responseType: 'text' });
  }

  /**
   * Changes the password for the user based on the provided details.
   *
   * @param changePasswordbody - An object containing the current and new password details.
   *
   * @returns An observable emitting an object with the result of the password change operation.
   */
  changePassword(changePasswordbody: CHANGE_PASS): Observable<Object> {
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.CHANGE_PASS);
    return this.httpClient.put(url, changePasswordbody);
  }

  /**
   * Opens a preview modal to display user information.
   *
   * @param formControl - The form group containing user data.
   * @param image - The image URL or data to be displayed in the modal.
   */
  openPreviewCard(formControl: FormGroup, image: string | ArrayBuffer): void {
    const modalRef = this.customModalService.open(
      PreviewModalComponent,
      CUSTOM_MODAL_CONFIG
    );
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

  /**
   * Retrieves a list of motives for deleting an account.
   *
   * @returns An observable emitting an array of strings representing the available motives for account deletion.
   */
  getDeleteAccountMotives(): Observable<string[]> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.LIST_MOTIVES_USER
    );
    return this.httpClient.get<string[]>(url);
  }

  /**
   * Deletes a user account based on the provided details.
   *
   * @param body - An object containing the details required to delete the user account.
   *
   * @returns An observable emitting a string response from the server indicating the result of the account deletion.
   */
  deleteUserAccount(body: DELETE_ACOUNT_USER): Observable<string> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.DELETE_USER_ACCOUNT
    );
    return this.httpClient.put(url, body, { responseType: 'text' });
  }
}
