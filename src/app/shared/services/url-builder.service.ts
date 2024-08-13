import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UrlBuilderService {
  language: string = localStorage.getItem('selectedLang');
  environmentUrl: string = `${environment.apiUrl}/${this.language}`;

  /**
   * Builds a URL by replacing placeholders with provided parameters.
   *
   * This method constructs a URL by appending the specified endpoint to the base environment URL and then
   * replaces placeholders in the endpoint with corresponding values from the `params` object.
   * Placeholders in the endpoint are represented as `${key}`, where `key` corresponds to a property name
   * in the `params` object.
   *
   * @param endpoint - The endpoint to append to the base environment URL. It can contain placeholders
   * in the format `${key}` which will be replaced by corresponding values from the `params` object.
   * @param params - An optional object containing key-value pairs to replace placeholders in the endpoint.
   * The key represents the placeholder name and the value represents the replacement value.
   * @returns The constructed URL with placeholders replaced by actual values.
   */
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
