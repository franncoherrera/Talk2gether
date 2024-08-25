import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/endpoints';
import { USER } from '../../../../shared/models/user.model';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';

@Injectable({
  providedIn: 'root',
})
export class CommonRegisterService {
  private httpClient = inject(HttpClient);
  private urlBuilderService = inject(UrlBuilderService);

  /**
   * Registers a new user with the provided user data.
   *
   * @param user - An object containing the user details required for registration.
   *
   * @returns An observable emitting the response from the server upon successful registration.
   */
  registerUser(user: USER): Observable<Object> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.REGISTER_USER
    );
    return this.httpClient.post(url, user);
  }

  /**
   * Registers a new user with the provided user data and referral code.
   *
   * @param user - An object containing the user details required for registration.
   * @param referralCode - The referral code used to register the user with a referral.
   *
   * @returns An observable emitting the response from the server upon successful registration with the referral code.
   */
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
