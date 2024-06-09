import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AUTH_TOKEN } from '../interceptors/auth.token';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

export const APP_PROVIDERS = {
  authProvider: {
    provide: AUTH_TOKEN,
    useValue: JSON.parse(localStorage.getItem('currentSession'))?.token || null,
  },
  httpInterceptor: {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
};
