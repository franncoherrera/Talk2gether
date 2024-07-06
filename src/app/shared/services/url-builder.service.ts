import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UrlBuilderService {
  language: string = localStorage.getItem('selectedLang');
  environmentUrl: string = `${environment.apiUrl}/${this.language}`;

  buildUrl(endpoint: string, params: { [key: string]: any } = {}): string {
    let url = this.environmentUrl + endpoint;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        url = url.replace(`\${${key}}`, params[key]);
      }
    }
    return url;
  }
}
