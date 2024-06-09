import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { SesionService } from './shared/interceptors/sesion.service';
import { APP_PROVIDERS } from './shared/providers/token-config';
import { provideTranslateModule } from './shared/providers/translate-loader.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ...provideTranslateModule(),
    SesionService,
    APP_PROVIDERS.authProvider,
    APP_PROVIDERS.httpInterceptor,
  ],
};
