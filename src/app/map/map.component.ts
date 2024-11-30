import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],  // Change this to .scss
})
export class MapComponent implements OnInit {
  private map!: L.Map;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([1.3521, 103.8198], 12);  // Singapore coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }
}
