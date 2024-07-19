import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { USER } from '../../../../shared/models/user.model';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';

@Injectable({
  providedIn: 'root',
})
export class CommonRegisterService {
  private httpClient = inject(HttpClient);
  private urlBuilderService = inject(UrlBuilderService);

  registerUser(user: USER): Observable<Object> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.REGISTER_USER
    );
    return this.httpClient.post(url, user);
  }

  registerUserReferral(user: USER, referralCode: string): Observable<Object> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.REGISTER_USER_REFERAL,
      {
        idReferral: referralCode,
      }
    );
    return this.httpClient.post(url, user);
  }
}
