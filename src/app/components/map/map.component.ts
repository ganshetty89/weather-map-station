import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { WeatherModalComponent } from '../weather-modal/weather-modal.component';
import { ApiService } from '../../services/api.service';  // Import the service
import { SearchLocationComponent } from '../search-location/search-location.component';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [SearchLocationComponent], // Import SearchLocationComponent
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private markers: { marker: L.Marker; name: string }[] = []; // Store markers with names
  stationNames: string[] = []; // Location names for autocomplete

  constructor(private apiService: ApiService, private dialog: MatDialog) {} // Inject ApiService

  ngOnInit(): void {
    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    this.map = L.map('map').setView([1.3521, 103.8198], 12); // Singapore coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private addMarkers(): void {
    this.apiService.getStationData().subscribe((data: any) => {
      const stations = data.area_metadata;
      const smallIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      stations.forEach((station: any) => {
        const { name, label_location } = station;
        const { latitude, longitude } = label_location;

        const marker = L.marker([latitude, longitude], { icon: smallIcon })
          .addTo(this.map)
          .on('click', () => {
            this.openWeatherModal(station);
          });

        this.markers.push({ marker, name });
        this.stationNames.push(name); // Populate names for autocomplete
      });
    });
  }

  private openWeatherModal(station: any): void {
    const { latitude, longitude } = station.label_location;
    this.apiService.getWeatherData(latitude, longitude).subscribe((weatherData: any) => {
      this.dialog.open(WeatherModalComponent, {
        data: { station, weatherData },
        width: '400px',
        panelClass: 'custom-modal',
      });
    });
  }

  // Zoom into the selected location
  focusOnLocation(locationName: string): void {
    const location = this.markers.find(({ name }) => name.toLowerCase() === locationName.toLowerCase());
    if (location) {
      const { marker } = location;
      this.map.setView(marker.getLatLng(), 15, { animate: true }); // Zoom to the location
    }
  }
}
