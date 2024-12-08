import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-weather-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.scss'],
})
export class WeatherModalComponent implements OnInit, OnDestroy {
  private miniMap!: L.Map; // To store the mini map instance

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject passed data
    private dialogRef: MatDialogRef<WeatherModalComponent> // Inject MatDialogRef
  ) {}

  ngOnInit(): void {
    this.initMiniMap(); // Initialize the mini map when the modal opens
  }

  ngOnDestroy(): void {
    if (this.miniMap) {
      this.miniMap.remove(); // Remove the map when the component is destroyed
    }
  }

  initMiniMap(): void {
    // Extract latitude and longitude from the passed data
    const { latitude, longitude } = this.data.station.label_location;

    // Initialize the mini map
    this.miniMap = L.map('mini-map', {
      center: [latitude, longitude], // Set view based on station coordinates
      zoom: 12, // Set a fixed zoom level
      zoomControl: false, // Disable zoom controls
      scrollWheelZoom: false, // Disable zoom with the scroll wheel
    });

    // Add a tile layer (you can choose any tile provider you prefer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.miniMap);

    // Add a marker at the station's location
    L.marker([latitude, longitude]).addTo(this.miniMap)
      .bindPopup(`Location: ${this.data.station.name}`);
  }

  close(): void {
    this.dialogRef.close(); // Close the modal dialog
  }
}
