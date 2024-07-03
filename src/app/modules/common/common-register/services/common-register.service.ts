import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { USER } from '../../../../shared/models/user.model';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonRegisterService {
  constructor(
    private httpClient: HttpClient,
    private urlBuilderService: UrlBuilderService
  ) {}

  registerUser(user: USER): Observable<Object> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.REGISTER_USER
    );
    return this.httpClient.post(url, user);
  }
}
