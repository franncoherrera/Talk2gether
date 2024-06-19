import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TOKEN_SESSION } from '../models/tokenSession.model';

@Injectable()
export class SesionService {

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
  }
}
