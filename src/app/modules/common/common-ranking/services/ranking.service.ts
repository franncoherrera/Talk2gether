import { inject, Injectable } from '@angular/core';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { RANKING_USER } from '../../../../shared/models/ranking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);
  private httpClient: HttpClient = inject(HttpClient);

  getRanking(userId: number): Observable<RANKING_USER[]> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.RANKING_USERS,
      {
        id: userId,
      }
    );
    return this.httpClient.get<RANKING_USER[]>(url);
  }
}
