import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { TOKEN_SESSION } from '../../../../shared/models/tokenSession.model';
import { USER_SESSION } from '../../../../shared/models/userSession.model';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';

@Injectable({
  providedIn: 'root',
})
export class CommonLoginService {
  reasonReport = new BehaviorSubject<string[]>(null);
  reasonReport$ = this.reasonReport.asObservable();

  private httpClient: HttpClient = inject(HttpClient);
  private sesionService: SesionService = inject(SesionService);
  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);

  /* Backend endpoints */
  login(email: string, password: string): Observable<Object> {
    const bodySession: USER_SESSION = {
      correo: email,
      contrasenia: password,
    };
    const urlEndpoint = this.urlBuilderService.buildUrl(
      ENDPOINTS.LOGIN_SESSION
    );
    return this.httpClient.post(urlEndpoint, bodySession).pipe(
      tap((tokenSession) => {
        this.sesionService.startLocalSession(tokenSession as TOKEN_SESSION);
      })
    );
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
