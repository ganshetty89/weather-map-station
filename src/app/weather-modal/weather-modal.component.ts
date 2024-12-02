import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.scss'],
})
export class WeatherModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject passed data
    private dialogRef: MatDialogRef<WeatherModalComponent> // Inject MatDialogRef
  ) {}

  close(): void {
    this.dialogRef.close(); // Close the modal dialog
  }
}
