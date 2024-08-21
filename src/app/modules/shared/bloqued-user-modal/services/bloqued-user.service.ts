import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/endpoints';
import { BLOQUED_USER } from '../../../../shared/models/bloquedUser.model';

@Injectable({
  providedIn: 'root',
})
export class BloquedUserService {
  private httpClient: HttpClient = inject(HttpClient);
  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);

  getPersonalData(idUser: number): Observable<BLOQUED_USER[]> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.BLOQUED_USERS,
      {
        id: idUser,
      }
    );
    return this.httpClient.get<BLOQUED_USER[]>(url);
  }
}
