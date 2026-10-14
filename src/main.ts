import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Le composant racine et sa configuration démarrent l'application standalone.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
