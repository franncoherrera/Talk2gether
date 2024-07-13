import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENDPOINTS } from '../enpoints/enpoints';
import { CurrentUser } from '../models/currentUser.model';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  role = new BehaviorSubject<string>(null);
  role$ = this.role.asObservable();
  idUser = new BehaviorSubject<number>(null);
  idUser$ = this.idUser.asObservable();

  constructor(
    private urlBuilderService: UrlBuilderService,
    private httpClient: HttpClient
  ) {}

  getCurrentUser(): Observable<CurrentUser> {
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.USER_ACTIVE);
    return this.httpClient.get<CurrentUser>(url);
  }

  saveRole(role: string): void {
    this.role.next(role);
  }
  getRole(): Observable<string> {
    return this.role$;
  }

  saveId(idUser: number): void {
    this.idUser.next(idUser);
  }

  getIdUser(): Observable<number> {
    return this.idUser$;
  }
}
