import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UrlBuilderService {
  environmentUrl: string = 'http://localhost:8080';

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
