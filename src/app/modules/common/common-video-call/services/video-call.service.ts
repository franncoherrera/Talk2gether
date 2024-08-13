import { inject, Injectable } from '@angular/core';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { QUALIFY_USER } from '../../../../shared/models/qualifyUser.model';

@Injectable({
  providedIn: 'root',
})
export class VideoCallService {
  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);
  private httpClient: HttpClient = inject(HttpClient);

  /**
   * Retrieves participant information for a specific user and meeting.
   *
   * @param userId - The ID of the user whose participant information is being retrieved.
   * @param idMeeting - The ID of the meeting for which the participant information is being retrieved.
   *
   * @returns An observable emitting a `QUALIFY_USER` object containing the participant details.
   */
  getParticipant(userId: number, idMeeting: string): Observable<QUALIFY_USER> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.GET_PARTICIPANT,
      {
        id: idMeeting,
      }
    );
    return this.httpClient.get<QUALIFY_USER>(url);
  }
}
