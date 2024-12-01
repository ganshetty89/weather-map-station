import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { routes } from './app.routes'; // Assuming you have routing configured, adjust if not

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // If using routing
    provideHttpClient(),  // Provides HttpClient module for HTTP requests
    MatDialogModule,  // Provides MatDialog for the modal
  ]
};
