import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { SesionService } from './shared/interceptors/sesion.service';
import { FIREBASE_CONFIG } from './shared/constants/firebaseConstants';
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
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG.firebase)),
    provideStorage(() => getStorage())
  ],
};
