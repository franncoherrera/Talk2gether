import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/endpoints';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';

@Injectable({
  providedIn: 'root',
})
export class CommonReferralLinkService {
  private httpClient = inject(HttpClient);
  private urlBuilderService = inject(UrlBuilderService);

  /**
   * Retrieves the referral link for a specific user based on their ID.
   *
   * @param userId - The ID of the user for whom the referral link is being retrieved.
   *
   * @returns An observable emitting a string representing the referral link for the user.
   */
  getReferralLink(userId: number): Observable<string> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.REFERRAL_LINK,
      {
        id: userId,
      }
    );
    return this.httpClient.get<string>(url);
  }
}
