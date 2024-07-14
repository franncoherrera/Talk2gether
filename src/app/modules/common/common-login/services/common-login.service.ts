import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { TOKEN_SESSION } from '../../../../shared/models/tokenSession.model';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';

@Injectable({
  providedIn: 'root',
})
export class CommonLoginService {
  reasonReport = new BehaviorSubject<string[]>(null);
  reasonReport$ = this.reasonReport.asObservable();

  constructor(
    private httpClient: HttpClient,
    private urlBuilderService: UrlBuilderService
  ) {}

  /* Backend endpoints */
  login(email: string, password: string): Observable<TOKEN_SESSION> {
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.LOGIN_SESSION);
    return this.httpClient.get<TOKEN_SESSION>(url);
  }

  recoverPass(email: string): Observable<Object> {
    const urlEndpoint = this.urlBuilderService.buildUrl(
      ENDPOINTS.RECOVER_PASSWORD
    );
    const body = {
      correo: email,
    };
    return this.httpClient.put(urlEndpoint, body);
  }

  /* Save observables */
  saveReason(reasons: string[]): void {
    this.reasonReport.next(reasons);
  }
  getReason(): Observable<string[]> {
    return this.reasonReport$;
  }

}
