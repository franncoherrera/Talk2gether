import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LanguageLevelModalComponent } from '../../modules/common/common-register/components/language-level-modal/language-level-modal.component';
import { InterestModalComponent } from '../../modules/shared/interest-modal/interest-modal.component';
import { CUSTOM_MODAL_CONFIG } from '../constants/customModalRefConfig';
import { ENDPOINTS } from '../enpoints/enpoints';
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

  getActiveCountries(): Observable<string[]> {
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.COUNTRY_ACTIVE);
    return this.httpClient.get<string[]>(url);
  }

  getActiveLanguages(): Observable<string[]> {
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.LANGUAGE_ACTIVE);
    return this.httpClient.get<string[]>(url);
  }

  getActiveLanguageLevel(): Observable<string[]> {
    const url = this.urlBuilderService.buildUrl(
      ENDPOINTS.LANGUAGE_LEVEL_ACTIVE
    );
    return this.httpClient.get<string[]>(url);
  }

  getActiveInterests(): Observable<INTEREST[]> {
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.INTERESTS_ACTIVE);
    return this.httpClient.get<INTEREST[]>(url);
  }

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

  openInterestModal(formGroup: FormGroup, controlName: string): void {
    const modalRef = this.customModalService.open(
      InterestModalComponent,
      CUSTOM_MODAL_CONFIG
    );
    modalRef.componentInstance.control = formGroup.get(controlName);
  }

  openLevelLanguageModal(): void {
    this.customModalService.open(
      LanguageLevelModalComponent,
      CUSTOM_MODAL_CONFIG
    );
  }
}
