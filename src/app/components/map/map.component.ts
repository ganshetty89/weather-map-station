import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { WeatherModalComponent } from '../weather-modal/weather-modal.component';
import { ApiService } from '../../services/api.service';
import { SearchLocationComponent } from '../search-location/search-location.component';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [CommonModule, SearchLocationComponent], // Add CommonModule
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private markers: { marker: L.Marker; name: string }[] = []; // Store markers with names
  stationNames: string[] = []; // Location names for autocomplete
  highlightedMarker: L.Marker | null = null; // Currently highlighted marker
  errorMessage: string = ''; // Error message

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

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
        iconUrl: 'assets/images/leaflet/marker-icon.png',
        shadowUrl: 'assets/images/leaflet/marker-shadow.png',
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
        this.stationNames.push(name);
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

  focusOnLocation(locationName: string): void {
    const location = this.markers.find(({ name }) => name.toLowerCase() === locationName.toLowerCase());
    if (location) {
      const { marker } = location;

      if (this.highlightedMarker) {
        this.resetMarker(this.highlightedMarker);
      }

      this.highlightMarker(marker);
      this.highlightedMarker = marker;

      this.map.setView(marker.getLatLng(), 15, { animate: true });
    }
  }

  private highlightMarker(marker: L.Marker): void {
    const highlightIcon = L.icon({
      iconUrl: 'assets/images/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/images/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    marker.setIcon(highlightIcon);
  }

  private resetMarker(marker: L.Marker): void {
    const defaultIcon = L.icon({
      iconUrl: 'assets/images/leaflet/marker-icon.png',
      shadowUrl: 'assets/images/leaflet/marker-shadow.png',
      iconSize: [15, 22],
      iconAnchor: [7.5, 22],
    });
    marker.setIcon(defaultIcon);
  }
}
