import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { USER_SESSION } from '../../../../shared/models/userSession';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';

@Injectable({
  providedIn: 'root',
})
export class CommonLoginService {


  reasonReport = new BehaviorSubject<string[]>(null);
  reasonReport$ = this.reasonReport.asObservable();

  role = new BehaviorSubject<string>(null);
  role$ = this.role.asObservable();

  constructor(
    private httpClient: HttpClient,
    private sesionService: SesionService,
    private urlBuilderService: UrlBuilderService
  ) {}

  /* Backend endpoints */
  login(email: string, password: string) {
    const bodySession: USER_SESSION = {
      //TODO Cambiar nombres del backend
      correo: email,
      contrasenia: password,
    };
    const urlEndpoint = this.urlBuilderService.buildUrl(ENDPOINTS.LOGIN_SESSION)
    return this.httpClient.post(urlEndpoint, bodySession).pipe(
      tap((tokenSession) => {
        const token = tokenSession;
        this.sesionService.startLocalSession(token);
      })
    );
  }

  /* Save observables */
  saveReason(reasons: string[]): void {
    this.reasonReport.next(reasons);
  }
  getReason(): Observable<string[]> {
    return this.reasonReport$;
  }
  saveRole(role: string): void {
    this.role.next(role);
  }
  getRole(): Observable<string> {
    return this.role$;
  }
}
