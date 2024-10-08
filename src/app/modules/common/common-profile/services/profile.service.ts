import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/endpoints';
import { PROFILE_USER } from '../../../../shared/models/profileUser.model';
import { PROFILE_BLOQUED_USER } from '../../../../shared/models/responseHttp.model';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { REPORT_USER } from '../../../../shared/models/reportUser.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  idUserProfile = new BehaviorSubject<number>(null);
  idUserProfile$ = this.idUserProfile.asObservable();

  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);
  private httpClient: HttpClient = inject(HttpClient);

  /**
   * Retrieves profile data for a given user.
   *
   * @param {number}  - The ID of the user for whom to retrieve the profile data.
   * @returns {Observable<PROFILE_USER>} An observable that emits the profile data of the user.
   */
  getProfileData(idUser: number): Observable<PROFILE_USER> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.PROFILE_DATA,
      {
        id: idUser,
      }
    );
    return this.httpClient.get<PROFILE_USER>(url);
  }

  /**
   * Verifies if a user has blocked another user.
   *
   * This method sends a POST request to the server to check if a user with the ID `idBlockUser` has blocked
   * a user with the ID `idBlockedUser`. The request is sent to the endpoint defined in `ENDPOINTS.BLOCK_VERIFICATION`.
   *
   * @param idBlockUser - The ID of the user who is potentially blocking another user.
   * @param idBlockedUser - The ID of the user who is potentially blocked.
   *
   * @returns {Observable<PROFILE_BLOQUED_USER>} An `Observable` of the PROFILE_BLOQUED_USER model. The response contains the result of the block verification.
   */
  checkBloquedUsers(
    idBlockUser: number,
    idBlockedUser: number
  ): Observable<PROFILE_BLOQUED_USER> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.BLOCK_VERIFICATION
    );
    const body = {
      idUsuarioQueBloquea: idBlockUser,
      idUsuarioBloqueado: idBlockedUser,
    };
    return this.httpClient.post<PROFILE_BLOQUED_USER>(url, body);
  }

  /**
   * Retrieves a list of active report motives for the user.
   *
   * This method sends an HTTP GET request to the specified endpoint to fetch an array
   * of strings representing the active report motives available on the platform.
   * The URL for the request is constructed using the `urlBuilderService`.
   *
   * @returns An `Observable<string[]>` that emits an array of active report motives.
   */
  getReportMotivesUser(): Observable<string[]> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.MOTIVES_PLATFORM_ACTIVE
    );
    return this.httpClient.get<string[]>(url);
  }

  /**
 * Submits a user report to the server.
 *
 * This method sends an HTTP POST request to report a user based on the provided 
 * motives. The report data is encapsulated in the `motivesReport` object, which 
 * is sent to the server using the constructed URL from `urlBuilderService`.
 *
 * @param motivesReport - An object of type `REPORT_USER` containing the report details.
 * @returns An `Observable<Object>` that emits the server's response to the report submission.
 */
  reportUser(motivesReport: REPORT_USER): Observable<Object> {
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.REPORT_USER);
    return this.httpClient.post(url, motivesReport);
  }

  /**
   * Saves the given user profile ID by emitting the value to the `idUserProfile` subject.
   *
   * @param {number} idUserProfile - The ID of the user profile to be saved.
   * @returns {void}
   */
  saveIdUserProfile(idUserProfile: number): void {
    localStorage.setItem('profile', idUserProfile.toString());
    this.idUserProfile.next(idUserProfile);
  }

  /**
   * Retrieves the user profile ID as an observable.
   *
   * @returns {Observable<number>} An observable that emits the ID of the user profile.
   */
  getIdUserProfile(): Observable<number> {
    return this.idUserProfile$;
  }
}
