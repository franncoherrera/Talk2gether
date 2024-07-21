import { inject, Injectable } from '@angular/core';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { Observable } from 'rxjs';
import { CONFIG_USER } from '../../../../shared/models/configUser.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalConfigurationService {
  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);
  private httpClient: HttpClient = inject(HttpClient);

  getPersonalData(idUser: number): Observable<CONFIG_USER> {
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.CONFIG_DATA, {
      id: idUser,
    });
    return this.httpClient.get<CONFIG_USER>(url);
  }
}
