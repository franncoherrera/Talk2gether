import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';

@Injectable({
  providedIn: 'root',
})
export class CommonReferralLinkService {
  
  private httpClient = inject(HttpClient);
  private urlBuilderService = inject(UrlBuilderService);

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
