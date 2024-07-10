import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../enpoints/enpoints';
import { UrlBuilderService } from './url-builder.service';
import { CurrentUser } from '../models/currentUser.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private urlBuilderService: UrlBuilderService,
    private httpClient: HttpClient
  ) {}

  getCurrentUser(): Observable<CurrentUser> {
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.USER_ACTIVE);
    return this.httpClient.get<CurrentUser>(url);
  }
}
