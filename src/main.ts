import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';  // Import the app config
import { AppComponent } from './app/app.component';  // Import the root component

bootstrapApplication(AppComponent, appConfig)  // Bootstrap the app with config
  .catch((err) => console.error(err));
