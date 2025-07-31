import 'reflect-metadata';
import 'zone.js'; // Included with Angular CLI.

import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';


console.log(`APIURL:${environment.apiUrl}`);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
