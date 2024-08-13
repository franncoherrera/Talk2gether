import { inject, Injectable } from '@angular/core';
import { UrlBuilderService } from '../../../../shared/services/url-builder.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENDPOINTS } from '../../../../shared/enpoints/enpoints';
import { HttpClient } from '@angular/common/http';
import { ROOM_USER } from '../../../../shared/models/roomUser.model';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  room = new BehaviorSubject<ROOM_USER>(null);
  room$ = this.room.asObservable();

  userIdChat = new BehaviorSubject<string>(null);
  userIdChat$ = this.userIdChat.asObservable();

  private urlBuilderService: UrlBuilderService = inject(UrlBuilderService);
  private httpClient: HttpClient = inject(HttpClient);

  /**
   * Searches for rooms associated with a specific user ID.
   *
   * @param idUser - The ID of the user whose associated rooms are being searched.
   *
   * @returns An observable emitting an array of `ROOM_USER` objects representing the rooms.
   */
  searchRoom(idUser: number): Observable<ROOM_USER[]> {
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.SEARCH_ROOM);
    return this.httpClient.get<ROOM_USER[]>(url);
  }

  /**
   * Searches for rooms based on a text search query.
   *
   * @param search - The text query used to search for rooms.
   *
   * @returns An observable emitting an array of `ROOM_USER` objects matching the search query.
   */
  searchRoomByText(search: string): Observable<ROOM_USER[]> {
    const url: string = this.urlBuilderService.buildUrl(ENDPOINTS.SEARCH_USER, {
      search: search,
    });
    return this.httpClient.get<ROOM_USER[]>(url);
  }

  /**
   * Searches for rooms with specific filters applied.
   *
   * @param filterSearch - An object containing the search filters: `idUser`, `minAge`, `maxAge`, `country`, `levelLanguage`, and `interest`.
   *
   * @returns An observable emitting an array of `ROOM_USER` objects that match the applied filters.
   */
  searchRoomFiltered(filterSearch: {
    idUser: number;
    minAge: number;
    maxAge: number;
    country: string;
    levelLanguage: string;
    interest: string;
  }): Observable<ROOM_USER[]> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.SEARCH_FILTER_ROOM,
      {
        id: filterSearch.idUser,
        minAge: filterSearch.minAge,
        maxAge: filterSearch.maxAge,
        country: filterSearch.country,
        levelLanguage: filterSearch.levelLanguage,
        interest: filterSearch.interest,
      }
    );
    return this.httpClient.get<ROOM_USER[]>(url);
  }

  /**
   * Retrieves the language that a user is learning based on their ID.
   *
   * @param idUser - The ID of the user whose learning language is being retrieved.
   *
   * @returns An observable emitting a string representing the language being learned by the user.
   */
  getLearnLanguage(idUser: number): Observable<string> {
    const url: string = this.urlBuilderService.buildUrl(
      ENDPOINTS.LANGUAGE_LEARN,
      {
        id: idUser,
      }
    );
    return this.httpClient.get<string>(url);
  }

  /**
   * Updates the room information with the provided `ROOM_USER` object.
   *
   * @param room - The `ROOM_USER` object representing the room to be saved.
   */
  saveRoom(room: ROOM_USER): void {
    this.room.next(room);
  }

  /**
   * Returns an observable that emits the current room information.
   *
   * @returns An observable emitting a `ROOM_USER` object representing the current room.
   */
  getRoom(): Observable<ROOM_USER> {
    return this.room$;
  }

  /**
   * Updates the chat user ID with the provided value.
   *
   * @param userIdChat - The chat user ID to be saved.
   */
  saveUserIdChat(userIdChat: string): void {
    this.userIdChat.next(userIdChat);
  }

  /**
   * Returns an observable that emits the current chat user ID.
   *
   * @returns An observable emitting a string representing the current chat user ID.
   */
  getUserIdChat(): Observable<string> {
    return this.userIdChat$;
  }
}
