import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component'; // Import MapComponent

export const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' }, // Redirect root to /map
  { path: 'map', component: MapComponent },  // Define the map route
];
