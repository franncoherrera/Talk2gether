import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);
  private httpClient: HttpClient = inject(HttpClient);

  rateUser(
    qualifierAccountId: number,
    qualifiedAccountId: number,
    idMeeting: number,
    stars: number
  ) {
    const body = {
      idCuentaCalificador: qualifierAccountId,
      idCuentaCalificado: qualifiedAccountId,
      idReunionVirtual: idMeeting,
      cantidadEstrellas: stars,
    };
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.RATE_USER);
    return this.httpClient.put(url, body);
  }
}
