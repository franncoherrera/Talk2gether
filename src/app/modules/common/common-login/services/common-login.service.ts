import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { TOKEN_SESSION } from '../../../../shared/models/tokenSession.model';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { USER_SESSION } from '../../../../shared/models/userSession.model';

@Injectable({
  providedIn: 'root',
})
export class CommonLoginService {
  reasonReport = new BehaviorSubject<string[]>(null);
  reasonReport$ = this.reasonReport.asObservable();

  private readonly sesionService: SesionService = inject(SesionService)
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly urlBuilderService: UrlBuilderService = inject(UrlBuilderService);

  /**
   * Logs in a user with the provided email and password.
   *
   * @param email - The email address of the user.
   * @param password - The password of the user.
   *
   * @returns An observable emitting a `TOKEN_SESSION` object upon successful login.
   *
   * @remarks
   * This method sends a GET request to the login endpoint to authenticate the user.
   */
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

  /**
   * Initiates a password recovery process for the given email address.
   *
   * @param email - The email address associated with the account for which the password needs to be recovered.
   *
   * @returns An observable that completes upon successfully initiating the password recovery process.
   *
   */
  recoverPass(email: string): Observable<Object> {
    const urlEndpoint = this.urlBuilderService.buildUrl(
      ENDPOINTS.RECOVER_PASSWORD
    );
    const body = {
      correo: email,
    };
    return this.httpClient.put(urlEndpoint, body);
  }

  /**
   * Updates the reason report with the given array of reasons.
   *
   * @param reasons - An array of strings representing the reasons to be reported.
   *
   */
  saveReason(reasons: string[]): void {
    this.reasonReport.next(reasons);
  }

  /**
   * Returns an observable that emits the current reason report.
   *
   * @returns An observable emitting an array of strings representing the current reasons report.
   *
   */
  getReason(): Observable<string[]> {
    return this.reasonReport$;
  }
}
