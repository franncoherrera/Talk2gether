import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LanguageLevelModalComponent } from '../../modules/common/common-register/components/language-level-modal/language-level-modal.component';
import { InterestModalComponent } from '../../modules/shared/interest-modal/interest-modal.component';
import { CUSTOM_MODAL_CONFIG } from '../constants/customModalRefConfig';
import { ENDPOINTS } from '../enpoints/endpoints';
import { INTEREST } from '../models/parameter.model';
import { CustomModalService } from './custom-modal.service';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
  providedIn: 'root',
})
export class ParameterService {
  private httpClient: HttpClient = inject(HttpClient);
  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);
  private customModalService: CustomModalService = inject(CustomModalService);

  /**
   * Retrieves a list of active countries from the server.
   *
   * This method sends a GET request to the endpoint specified in `ENDPOINTS.COUNTRY_ACTIVE`
   * and returns an observable containing an array of active countries.
   *
   * @returns An observable that emits an array of active countries.
   */
  getActiveCountries(): Observable<string[]> {
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.COUNTRY_ACTIVE);
    return this.httpClient.get<string[]>(url);
  }

  /**
   * Retrieves a list of active languages from the server.
   *
   * This method sends a GET request to the endpoint specified in `ENDPOINTS.LANGUAGE_ACTIVE`
   * and returns an observable containing an array of active languages.
   *
   * @returns An observable that emits an array of active languages.
   */
  getActiveLanguages(): Observable<string[]> {
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.LANGUAGE_ACTIVE);
    return this.httpClient.get<string[]>(url);
  }

  /**
   * Retrieves a list of active language levels from the server.
   *
   * This method sends a GET request to the endpoint specified in `ENDPOINTS.LANGUAGE_LEVEL_ACTIVE`
   * and returns an observable containing an array of active language levels.
   *
   * @returns An observable that emits an array of active language levels.
   */
  getActiveLanguageLevel(): Observable<string[]> {
    const url = this.urlBuilderService.buildUrl(
      ENDPOINTS.LANGUAGE_LEVEL_ACTIVE
    );
    return this.httpClient.get<string[]>(url);
  }

  /**
   * Retrieves a list of active interests from the server.
   *
   * This method sends a GET request to the endpoint specified in `ENDPOINTS.INTERESTS_ACTIVE`
   * and returns an observable containing an array of active interests.
   *
   * @returns An observable that emits an array of active interests.
   */
  getActiveInterests(): Observable<INTEREST[]> {
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.INTERESTS_ACTIVE);
    return this.httpClient.get<INTEREST[]>(url);
  }

  /**
   * Refactors the list of interests from a form control into an array of interest names.
   *
   * This method extracts the value from a form control specified by `controlName` and transforms it
   * into an array of interest names if the value is an array of objects with a `name` property.
   *
   * @param formGroup - The `FormGroup` containing the form control.
   * @param controlName - The name of the form control containing the interest data.
   * @returns An array of interest names, or `null` if the control is not found or the value is not an array.
   */
  interestListRefactor(formGroup: FormGroup, controlName: string): string[] {
    const interestControl = formGroup.get(controlName);
    if (interestControl && Array.isArray(interestControl.value)) {
      const interestArray: string[] = interestControl.value.map(
        (item: { name: string }) => item.name
      );
      return interestArray;
    }
    return null;
  }

  /**
   * Opens a modal to select interests.
   *
   * This method opens a modal with the `InterestModalComponent` and passes the specified form control
   * to the modal instance. The modal is configured using `CUSTOM_MODAL_CONFIG`.
   *
   * @param formGroup - The `FormGroup` containing the form control.
   * @param controlName - The name of the form control to pass to the modal instance.
   */
  openInterestModal(formGroup: FormGroup, controlName: string): void {
    const modalRef = this.customModalService.open(
      InterestModalComponent,
      CUSTOM_MODAL_CONFIG
    );
    modalRef.componentInstance.control = formGroup.get(controlName);
  }

  /**
   * Opens a modal to select language levels.
   *
   * This method opens a modal with the `LanguageLevelModalComponent`. The modal is configured using `CUSTOM_MODAL_CONFIG`.
   */
  openLevelLanguageModal(): void {
    this.customModalService.open(
      LanguageLevelModalComponent,
      CUSTOM_MODAL_CONFIG
    );
  }
}
