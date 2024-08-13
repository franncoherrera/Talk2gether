import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENDPOINTS } from '../enpoints/enpoints';
import { CURRENT_USER } from '../models/currentUser.model';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  role = new BehaviorSubject<string>(null);
  role$ = this.role.asObservable();
  idUser = new BehaviorSubject<number>(null);
  idUser$ = this.idUser.asObservable();

  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);
  private httpClient: HttpClient = inject(HttpClient);

  /**
   * Retrieves the current user information.
   *
   * This method sends an HTTP GET request to fetch the current user's details. The request is made to the endpoint
   * specified by `ENDPOINTS.USER_ACTIVE`, and the response is typed as `CURRENT_USER`.
   *
   * @returns An observable that emits the current user details as an instance of `CURRENT_USER`.
   */
  getCurrentUser(): Observable<CURRENT_USER> {
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.USER_ACTIVE);
    return this.httpClient.get<CURRENT_USER>(url);
  }

  /**
   * Saves the user's role.
   *
   * This method updates the current role by emitting the provided role value to the `role` subject.
   *
   * @param role - The role to be saved. This value will be emitted to the `role` subject.
   */
  saveRole(role: string): void {
    this.role.next(role);
  }

  /**
   * Gets the current user's role.
   *
   * This method returns an observable that emits the current user's role value from the `role` subject.
   *
   * @returns An observable that emits the current user's role as a string.
   */
  getRole(): Observable<string> {
    return this.role$;
  }

  /**
   * Saves the user ID.
   *
   * This method updates the current user ID by emitting the provided ID value to the `idUser` subject.
   *
   * @param idUser - The ID of the user to be saved. This value will be emitted to the `idUser` subject.
   */
  saveId(idUser: number): void {
    this.idUser.next(idUser);
  }

  /**
   * Gets the current user ID.
   *
   * This method returns an observable that emits the current user ID value from the `idUser` subject.
   *
   * @returns An observable that emits the current user ID as a number.
   */
  getIdUser(): Observable<number> {
    return this.idUser$;
  }
}
