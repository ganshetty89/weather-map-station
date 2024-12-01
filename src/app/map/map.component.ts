import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { WeatherModalComponent } from '../weather-modal/weather-modal.component'; // Make sure to adjust the import path

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
        const { name, label_location, forecast } = station;
        const { latitude, longitude } = label_location;

        const marker = L.marker([latitude, longitude], { icon: smallIcon })
          .addTo(this.map)
          .bindPopup(`
            <b>${name}</b>
            <p>Location: (${latitude}, ${longitude})</p>
          `)
          .on('click', () => {
            this.openWeatherModal(station);
          });
      });
    });
  }

  // Open the modal with weather details
  private openWeatherModal(station: any): void {
    this.dialog.open(WeatherModalComponent, {
      data: station,  // Pass station data to modal
      width: '400px', // Set modal width
    });
  }
}
