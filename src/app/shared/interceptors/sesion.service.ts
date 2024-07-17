import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TOKEN_SESSION } from '../models/tokenSession.model';
import { CustomTranslateService } from '../services/custom-translate.service';

@Injectable()
export class SesionService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  customTranslateService = inject(CustomTranslateService);
  private hasToken(): boolean {
    return (
      !!localStorage.getItem('isLoggedIn') &&
      localStorage.getItem('isLoggedIn') === 'true'
    );
  }

  // Log In Event dispatcher
  private announceSource = new Subject<string>();
  // For login subscribers.
  announced$ = this.announceSource.asObservable();

  /**
   * Clear all the session data stored in the browser and notifies session listening components.
   */
  clearLocalSession(): void {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');
    this.setLoggedIn(false);
    this.customTranslateService.setLanguage();
  }

  /**
   * Returns the local stored session obtained by the last "login" action.
   * @returns {any}
   */
  getCurrentSesion(): string {
    return JSON.parse(localStorage.getItem('currentSession'));
  }

  /**
   * Return the local stored session state obtained by the last "login" action.
   * @returns {boolean}
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  public startLocalSession(token: TOKEN_SESSION): void {
    if (!!token) {
      localStorage.setItem('currentSession', JSON.stringify(token.token));
    }
    if (token !== undefined) {
      localStorage.setItem('isLoggedIn', 'true');
    }
    this.setLoggedIn(true);
  }

  setLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }
  getLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
