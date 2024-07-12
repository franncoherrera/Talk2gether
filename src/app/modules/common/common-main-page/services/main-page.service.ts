import { Injectable } from '@angular/core';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { HttpClient } from '@angular/common/http';
import { ROOM_USER } from '../../../../shared/models/roomUser.model';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  constructor(
    private urlBuilderService: UrlBuilderService,
    private httpClient: HttpClient
  ) {}

  searchRoom(idUser: number): Observable<ROOM_USER[]> {
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.SEARCH_ROOM);
    return this.httpClient.get<ROOM_USER[]>(url);
  }
}
