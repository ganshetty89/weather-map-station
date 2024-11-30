import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component'; // Adjust the import path if needed

export const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' }, // Redirect to the map by default
  { path: 'map', component: MapComponent },
];
