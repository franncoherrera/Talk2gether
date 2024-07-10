import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FIREBASE_CONFIG } from './shared/constants/firebaseConstants';
import { TokenInterceptor } from './shared/interceptors/auth.interceptor';
import { SesionService } from './shared/interceptors/sesion.service';
import { provideTranslateModule } from './shared/providers/translate-loader.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ...provideTranslateModule(),
    SesionService,
    provideHttpClient(withInterceptors([TokenInterceptor])),
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG.firebase)),
    provideStorage(() => getStorage())
  ],
};
