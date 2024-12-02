import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { WeatherModalComponent } from '../weather-modal/weather-modal.component'; // Import modal

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

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
    const apiUrl = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';

    const smallIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    this.http.get(apiUrl).subscribe((data: any) => {
      const stations = data.area_metadata;

      stations.forEach((station: any) => {
        const { name, label_location } = station;
        const { latitude, longitude } = label_location;

        const marker = L.marker([latitude, longitude], { icon: smallIcon })
          .addTo(this.map)
          .on('click', () => {
            this.openWeatherModal(station);
          });
      });
    });
  }

  // Open modal with weather details
  private openWeatherModal(station: any): void {
    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${station.label_location.latitude}&longitude=${station.label_location.longitude}&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore`;

    this.http.get(openMeteoUrl).subscribe((weatherData: any) => {
      this.dialog.open(WeatherModalComponent, {
        data: { station, weatherData },
        width: '400px', // Set modal width
        panelClass: 'custom-modal', // Optional: Add custom class
      });
    });
  }
}
