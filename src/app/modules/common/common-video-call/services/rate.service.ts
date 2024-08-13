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

  /**
   * Submits a rating for a user based on the provided details.
   *
   * @param qualifierAccountId - The ID of the account submitting the rating.
   * @param qualifiedAccountId - The ID of the account being rated.
   * @param idMeeting - The ID of the meeting associated with the rating.
   * @param stars - The number of stars given in the rating.
   *
   * @returns An observable emitting the response from the server after submitting the rating.
   */
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
