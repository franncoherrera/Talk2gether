import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlBuilderService } from './url-builder.service';
import { ENDPOINTS } from '../enpoints/enpoints';
import { Observable } from 'rxjs';
import { INTEREST } from '../models/parameter.model';

@Injectable({
  providedIn: 'root',
})
export class ParameterService {
  constructor(
    private httpClient: HttpClient,
    private urlBuilderService: UrlBuilderService
  ) {}

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

  getActiveInterests(): Observable<INTEREST[]>{
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.INTERESTS_ACTIVE);
    return this.httpClient.get<INTEREST[]>(url);
  }
}
