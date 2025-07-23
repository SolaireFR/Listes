import { ApplicationConfig, EnvironmentProviders } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from '../environments/environment';
import { provideKeycloak } from 'keycloak-angular';
import { routes } from './app.routes';

const provideKeycloakAngular = (): EnvironmentProviders =>
    provideKeycloak({
        config: {
            url: environment.keycloakUrl,
            realm: environment.keycloakRealm,
            clientId: environment.keycloakClientId,
        },
        initOptions: {
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        },
    });

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),
    // provideKeycloakAngular(),
    ConfirmationService,
    MessageService,
  ],
};
