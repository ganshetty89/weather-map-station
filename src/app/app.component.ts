import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Import RouterOutlet to handle routing

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  // Import RouterOutlet for routing
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],  // Corrected styleUrl to styleUrls
})
export class AppComponent {
  title = 'weather-map-station';
}
