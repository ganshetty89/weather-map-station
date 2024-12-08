import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // API call to get station metadata
  getStationData(): Observable<any> {
    const apiUrl = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
    return this.http.get<any>(apiUrl);
  }

  // API call to get weather data for a specific station
  getWeatherData(latitude: number, longitude: number): Observable<any> {
    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore`;
    return this.http.get<any>(openMeteoUrl);
  }
}
