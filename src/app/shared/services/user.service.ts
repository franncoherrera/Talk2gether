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
  

  getCurrentUser(): Observable<CURRENT_USER> {
    const url = this.urlBuilderService.buildUrl(ENDPOINTS.USER_ACTIVE);
    return this.httpClient.get<CURRENT_USER>(url);
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
