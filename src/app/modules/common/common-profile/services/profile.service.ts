import { inject, Injectable } from '@angular/core';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../../../../shared/enpoints/endpoints';
import { Observable } from 'rxjs';
import { PROFILE_USER } from '../../../../shared/models/profileUser.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);
  private httpClient: HttpClient = inject(HttpClient);

  getProfileData(idUser: number = 4): Observable<PROFILE_USER> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.PROFILE_DATA,
      {
        id: idUser,
      }
    );
    return this.httpClient.get<PROFILE_USER>(url);
  }
}
